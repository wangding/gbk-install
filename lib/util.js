const cp    = require('child_process'),
      log   = console.log,
      path  = require('path'),
      print = require('util').debuglog('util'),
      fs    = require('fs'),
      out   = process.stdout;

let plugins = null,  // GitBook plugins in book.json
    args    = null;  /* npm command arguments
                        run npm command to install GitBook plugins
                        npm install --no-save plugin-a plugin-b --registry=https://registry.npm.taobao.org */

module.exports = {
  getPlugins() {
    let bkJson = path.join(process.cwd(), 'book.json');

    if(!fs.existsSync(bkJson)) throw new Error(`ERROR: ${bkJson} not exist.`);

    bkJson  = fs.readFileSync(bkJson).toString('utf8');
    plugins = JSON.parse(bkJson).plugins;
    plugins = plugins
      .filter((plugin) => { if(plugin.charAt(0) !== '-') return plugin; })
      .map((plugin) => 'gitbook-plugin-' + plugin);

    return this;
  },

  generateArgs() {
    if(plugins === null) throw new Error('Error: no plugins.');

    args = [...plugins];
    args.push('--registry=https://registry.npm.taobao.org');
    args = ['install', '--no-save'].concat(args);

    return this;
  },

  debug() {
    if(plugins === null) throw new Error('Error: no plugins');
    if(args    === null) throw new Error('Error: no npm arguments');

    print(`GitBook plugins:\n${plugins.join('\n')}\n`);
    print(`npm arguments:  \n${args.join('\n')}\n`);

    return this;
  },

  installPlugins() {
    if(plugins === null) throw new Error('Error: no plugins');
    if(args    === null) throw new Error('Error: no npm arguments');

    cp.execFile('npm', args, (err, stdout) => {
      if(err) {
        throw(err);
      } else {
        log();
        log(stdout);
        process.exit();
      }
    });

    return this;
  },

  animate() {
    setInterval(() => out.write('.'), 500);

    return this;
  }
};

