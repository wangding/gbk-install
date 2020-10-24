#!/usr/bin/env node

const installer = require('../index');

process.on('uncaughtException', (err) => console.log(err.message));

installer
  .getPlugins()
  .generateArgs()
  .debug()
  .installPlugins()
  .animate();
