HapiDog 哈皮狗
============
`轻量级` `前端` `脚手架`
## 项目结构
| 目录 | 描述 |
|:-|:-|
| _build | 打包压缩的文件目录 |
| assets | 资源目录   1.static 图片等静态资源目录 2.styles 样式文件目录 3.app.js 入口文件 |
| components | 模块目录 |
| mock | 模拟数据文件目录 |
| page | 视图目录   1.index.html 首页 |
    
## 文档
#### 文件操作
- 创建视图 
    - npm run create <视图名称>
- 创建组件 
    - npm run new <组件名称>
- 删除视图 
    - npm run delete <视图名称>
- 删除组件 
    - npm run remove <组件名称>
- 监听文件／目录
    - npm run watch 默认是监听page目录以及components目录