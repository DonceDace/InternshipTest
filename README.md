# h5应用模板

1. `.umirc.js` 配置说明
  - css混淆名称使用class_[hash:8]格式，默认使用class__[hash:base64:6]
  - postcss自动转换px->rem
  - 路由懒加载
  loading 为小程序（distinct-miniapp）默认loading
  - 去除antd
  - 定义全局变量`SERVER_ENV` 配合环境切换
  - 忽略打包`moment` 内的local(100kb+)文件
  - 增加chunks
  将umi文件与其它node包分开打包至 umi.3.5.20.[hash].js 、vendor.[hash].js 和项目js更名为 main.[hash].js

2. eslint配置
  - 采用原定eslint配置规则
  - 增加全局变量 `SERVER_ENV` 
  - 拓展默认`eslint-config-umi` 
  - 其它配置
    + env 支持 jest、node、es6 
    + ignorePatterns 忽略的lint文件 
    + import/resolver 导入文件规则设置，包括别名及可省略的文件后缀

3. jest.config.js配置
  - setupFiles 增加 node 环境的 react 支持
  - moduleNameMapper 支持别名虚拟样式文件
  - globals 增加`SERVER_ENV` 全局变量
  - collectCoverageFrom 测试需要覆盖的文件 
  - coveragePathIgnorePatterns 测试需要忽略覆盖的文件

4. package.json
  - 增加区分环境的启动及打包命令（与distinct-miniapp基本一致）
  - `npm run build:analyze` 带分析图的打包
  - `npm run lint` 检测或修复 src 目录下的所有js/jsx文件
  - `npm run lint:style` 修复 src 目录下的所有css/less文件
  - `npm run test` 自动测试 **.test.js 文件
  - `npm run test:coverage` 自动测试 **.test.js 文件，并展示测试覆盖率报告
  - gitHooks 配合 lint-staged 提交commit自动修复js和css
  - stylelint 基本的 stylelint 配置

5. tsconfig.json、typings.d.ts 暂时用不到

6. .vscode/launch.json 增加 VS code 增加配合umi-test的测试命令

7. .vscode/settings.json 配置 VS code （eslint、stylelint插件）保存时自动修复js和css

8. utils中request对fetch进行封装，请求时，在api目录下构建请求，再在业务中引用，如请求需要缓存可再

9. 图片统一config/imagesConfig中进行管理