HapiDog 哈皮狗
============
`轻量级` `前端` `脚手架`
## 项目结构
| 目录 | 描述 |
|:-|:-|
| _build | 编译打包后的文件存放目录 |
| assets | 资源存放目录，包括：  1) static 图片等静态资源目录   2) styles 样式文件目录   3) app.js 入口文件 |
| components | 模块存放目录 |
| mock | 模拟数据文件目录 |
| page | 视图目录   1) index.html 首页 |
    
## 文档
##### 组件
- 通用（共 2 个）
    - Button 按钮
    - Icon 图标
    - 
- 布局（共 2 个）
    - Grid 栅格
    - Layout 布局
- 导航（共 5 个）
    - Breadcrumb 面包屑
    - Dropdown 下拉菜单
    - Menu 导航菜单
    - Pagination 分页
    - Steps 步骤条
- 表单（共 15 个）
    - AutoComplete 自动完成
    - DatePicker 时间控件
    - Cascader 级联选择
    - CheckBox 多选
    - CheckBoxGroup 多选组
    - Radio 单选
    - Select 下拉菜单
    - Slider 滑块
    - Switch 开关
    - RarioGroup 单选组
    - TextBox 输入框
    - TextArea 文本域
    - Tree 树
    - Transfer 穿梭框
    - Upload 上传
- 通知（共 5 个）
    - Dialog 对话框
    - Message 消息提示
    - MessagBox 提示框
    - Notification 通知
    - ToolTip 消息提示

- 其他（共 3 个）
    - Card 卡片
    - Carousel 跑马灯
    - Collapse 折叠面板
- NavMenu 导航栏
#### 工具函数
持续更新...
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