/* global describe, it: true */
const expect    = require('chai').expect,
      installer = require('../index');

describe('gitbook-install 测试套件', function() {
  it('当前目录没有 book.json', function(){
    expect(installer.getPlugins).to.throw(/not exist/);
  });

  it('当前目录有 book.json，但是调用顺序不正常', function(){
    process.chdir('./test');
    expect(installer.generateArgs).to.throw(/no plugins/);
  });

  it('当前目录有 book.json，且调用顺序正常', function(){
    class TestStream extends require('stream').Writable {
      _write(chunk, callback) {
        //console.log(chunk.toString('utf8'));
        expect(chunk.toString('utf8')).to.match(/gitbook-plugin/);
        callback();
      }
    }

    let strm = new TestStream();
    process.stderr.write = strm.write.bind(strm);

    installer
      .getPlugins()
      .generateArgs()
      .debug();
  });
});
