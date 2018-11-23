<p align="center">
  <a href="https://github.com/FreemenL/emptyd">
    <img width="230" src="https://avatars3.githubusercontent.com/u/23741346?s=400&u=75096daa89916a123bd9f18f3f76768dad27188a&v=4">
  </a>
</p>


# empty-design 简称 emptyd

`emptyd` 是基于`react + antd`的扩展组件库，主要包括`通用小组件`、`快速开发页面的多风格模板(HOC高阶组件)`、`通用工具函数`、`通用样式类`

`emptyd` 需要搭配`emptyd-admin-webpack`脚手架使用
实现了基本的页面配置化  表单配置化

# emptyd-admin-webpack 脚手架 v0.0.1

基于 `react + react-router + antd + emptyd(我们的扩展组件) + scss` 的 webpack4 前端开发环境

1、支持基本的图片文件 `png|jpe?g|gif|svg` 加载,转 base64 打包

2、支持 `js,jsx,css,less` 公共代码抽取，压缩打包

3、`babel-loader + less` 模块加载功能

4、`webpack-dev-server` 服务器，支持反代理配置，热加载热更新

5、`babel-polyfill` 让 `IE10+`浏览器支持 es6+语法的垫片

6、`react-loadable` 结合 `babel-plugin-syntax-dynamic-import` 支持 react 组件的按需加载

7、支持使用 `less` 变量自定义 `antd` 的主题

