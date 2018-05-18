HapiDog 哈皮狗
===
`轻量级` `前端` `脚手架`
### 项目目录
- _build 打包压缩的文件目录
- assets 资源目录
    - static 图片等静态资源目录
    - styles 样式文件目录
    - app.js 入口文件
- components 模块目录
- mock 模拟数据文件目录
- page 视图目录
    - index.html 首页
### api文档
- 创建视图 
    - npm run create <视图名称>
- 创建组件 
    - npm run new <组件名称>
- 删除视图 
    - npm run delete <视图名称>
- 删除组件 
    - npm run remove <组件名称>
- 移动／重命名视图
    - npm run rename
- 移动／重命名组件
    - npm run rn oldFile/oldDir newFile/newDir
- 监听文件／目录
    - npm run watch <文件／目录>