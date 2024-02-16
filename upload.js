const request = require("request");
const fs = require("fs");
const path = require("path");
const config = require("./config.js");
const { getProjectConfig } = require("linkzip-cli/helpers/config");

function uploadBuild(
  token,
  projectConfigFile,
  buildFile,
  deployMessage,
  callback
) {
  const apiURL = config.systemConfig.api;
  const projectCredentials = getProjectConfig(projectConfigFile);
  const parsed = new URL(buildFile, "file:///");
  const fileName = path.basename(parsed.pathname);
  const options = {
    method: "POST",
    url: `${apiURL}/upload`,
    headers: {
      "X-AUTH-TOKEN": token,
      "X-AUTH-PROJECT": projectCredentials.project_id,
      "X-MESSAGE": deployMessage,
    },
    formData: {
      build_file: {
        value: fs.createReadStream(buildFile),
        options: {
          filename: fileName,
          contentType: null,
        },
      },
    },
  };
  request(options, function (error, response) {
    if (error) throw Error(error);
    const data = JSON.parse(response.body);
    callback(data);
  });
}

module.exports = { uploadBuild };
