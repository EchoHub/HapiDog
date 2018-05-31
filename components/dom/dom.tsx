
/**
 * @desc 解析成html片段
 * @param content 需要解析的片段
 */
export function parse(content) {
    const result = document.createTextNode(content);
    return result;
}
/**
 * @desc 查询匹配的节点
 * @param selector 选择器
 */
export function query(selector: String) {
    console.log(selector)
}

/**
 * @desc 创建文本节点
 */
export function createTextNode(data) {
    return document.createTextNode(data);
}

/**
 * @desc 创建一个指定类型的节点
 * @param type 节点类型
 * @param props 属性
 * @param children? 子节点
 */
export function createElement(type, props) {
    if(!type) return ""
    const element = document.createElement(type);
    for(const key in props) {
        // 如果节点存在该属性 则添加
        let _key = /^on[A-Z]*/.test(key) ? key.toLowerCase() : key;
        if(_key in element) (/^on[A-Z]*/.test(key) || /^className$/.test(key)) ? element[_key] = props[key]:element.setAttribute(_key, props[key]);
    }
    return element;
}