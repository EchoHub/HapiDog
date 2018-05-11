const process = require("process");
const path = require("path");
const fs = require("fs");
const param = getArgv();
const colors = require('colors');

const dirPath = {
    component: path.resolve(__dirname, "./../../components")
}
const _fileCopyPath = {
    page: path.resolve(__dirname, "./../../page"),
    component: path.resolve(__dirname, "./../../components")
};
(function () {
    let name;
    switch (param[0]) {
        case "page":
            name = param[1];
            log(param[0], name, "html");
            copyFile(_fileCopyPath.page, path.resolve(__dirname, `./../../page/${name}.html`), "index.html", `${name}.html`)
            break;
        case "component":
            name = param[1];
            log(param[0], name, "jsx | scss | md")
            copyDirFiles(_fileCopyPath.component, `${dirPath.component}/${name}`, name)
            break;
        default:
            throw console.log("illegal param".red)
            break;
    }
})();
/**
 * @desc 获取命令行 传入参数
 */
function getArgv() {
    return process.argv.slice(2);
}
/**
 * @desc 创建文件 日志打印
 * @param style 类型
 * @param name 模块名称
 * @param info 模版信息
 */
function log(type, name, info) {
    const _enum = {
        "page": "页面",
        "component": "组件"
    };
    let _type = _enum[type];
    console.log(`--- 开始创建 ---`.green);
    console.log(`* ${_type}名称：${name}`.green);
    console.log(`* ${_type}信息：${info}`.green);
    console.log(`创建中，请稍等...`.green);
    console.log(`--- 创建完成 ---`.green);
}
/**
 * @desc 拷贝文件
 * @param src_path 文件源目录路径
 * @param dst_path 目标目录路径
 * @param template 模版文件名称
 * @param target 目标文件名称
 */
function copyFile(src_path, dst_path, template, target) {
    files = fs.readdirSync(src_path);
    let allow = true;
    files.forEach(d => {
        if (d === target) {
            console.log("页面已存在,创建失败".red);
            allow = false;
            return;
        }
    });
    allow && fs.createReadStream(path.resolve(src_path, template)).pipe(fs.createWriteStream(dst_path))
}
/**
 * @desc 拷贝指定目录下的文件
 */
function copyDirFiles(src, dst, target) {
    const files = fs.readdirSync(src);
    let allow = true;
    files.forEach(d => {
        if (d === target) {
            console.log("组件已存在，创建失败");
            allow = false;
            return;
        }
    });
    allow && fs.mkdirSync(dst);
    fs.readdirSync(src + "/_template").forEach(d => {
    fs.createReadStream(src + `/_template/${d}`).pipe(fs.createWriteStream(dst + `/${target}.${d.split("")[1]}`))
    })


}