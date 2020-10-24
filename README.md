# gitbook-install

GitBook plugins install tools

背景：

- `gitbook install` 用来安装 book.json 中的插件
- 国内用户，GitBook 插件安装速度非常慢，体验很差
- `gitbook-install` 工具，用来替代`gitbook install`
- 提升 GitBook 插件的安装速度

环境：

- node.js 版本 >= 12.19.0
- npm     脚本 >= 6.14.8

用法：

- 安装 `gitbook-install`，运行命令：`npm i -g gitbook-install`
- 安装 GitBook 插件，运行命令：`gitbook-install`

示例：

- 下载 GitBook 仓库，运行命令：`git clone https://github.com/wangding/info-theory-lab-manual manual`
- 进入 `manual` 仓库，运行命令：`cd manual`
- 安装 GitBook 插件，运行命令：`gitbook-install`
- 运行 GitBook 网站，运行命令：`gitbook serve --port 8080`
- 浏览器访问 URL：`http://localhost:8080`
