# Nebulis Coding Analytics Endpoint
![TravisCI Status](https://img.shields.io/travis/NebulisAnalytics/nebulis-server.svg) ![Coverage Status](https://coveralls.io/repos/github/NebulisAnalytics/nebulis-server/badge.svg?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/NebulisAnalytics/nebulis-endpoint/badge.svg)](https://snyk.io/test/github/NebulisAnalytics/nebulis-endpoint) [![npm version](https://badge.fury.io/js/nebulis-endpoint.svg)](https://badge.fury.io/js/nebulis-endpoint)

This is the endpoint for tracking Nebulis coding projects.

Nebulis provides realtime analytics and reporting for coding projects. With Nebulis you can embed an endpoint into your coding units so that you can gather code changes to a project fork. Nebulis is set up to be close to zero configuration, so as soon as the endpoint is launched on a fork, that user will be instantly registered into the system and attached to the associated project.

## Installation
---

The endpoint cleanly embeds into a project you are working on and monitors activity.

To install simply run
```
npm install --save nebulis-endpoint
```

Nebulis requires only one file for configuration. In your project root add a .nebulis file which contains this structure:
```
{
  "server": "myserver.com",
  "port": 443
}
```
This will point the endpoint at your Nebulis server.

Then in you project file add:
```
const nebulis = require('nebulis-endpoint');
```

when the project is run, the server will run automatically.
