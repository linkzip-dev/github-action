const fs = require("fs");
const core = require("@actions/core");
const { zipBuild } = require("linkzip-cli/services/zip");
const { uploadBuild } = require("./upload.js");
const config = require("./config.js");
const { apiErrors } = require("linkzip-cli/errors");

const { getCurrentPath } = require("linkzip-cli/helpers/filesystem");

function processResponse(res) {
  if (res.status === "ok") {
    console.log(res.message);
    core.setOutput("deploy-url", res.message);
  } else {
    const message = apiErrors[res.message];
    const error = `Error: code=${res.message}, message=${message}`;
    core.setFailed(error);
  }
}

try {
  const apiToken = core.getInput("api-token");
  const deployMessage = core.getInput("deploy-message");

  const currentPath = getCurrentPath();
  const projectConfigFile = `${currentPath}/${config.systemConfig.configProjectFileName}`;

  zipBuild(config, projectConfigFile, currentPath, function (archiveFile) {
    uploadBuild(
      apiToken,
      projectConfigFile,
      archiveFile,
      deployMessage,
      function (res) {
        fs.unlinkSync(archiveFile);
        processResponse(res);
      }
    );
  });
} catch (error) {
  core.setFailed(error.message);
}
