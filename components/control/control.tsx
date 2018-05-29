/// <reference path="jsx.d.ts" />
import * as DOM from "dom/dom"
/**
 * @desc 控件状态
 */
export const ControlState = {
    // 初始状态
    initial: 1,
    // 需要重新渲染
    invalidated: 2,
    // 正在渲染
    rendering: 3,
    // 渲染完成
    rendered: 4
}
/**
 * @desc 表示一个控件基类
 */
export default class Control {
    render() {
        return <div></div>
    }

    // 对应的原生节点
    private _elem: HTMLElement;
    /**
     * @desc 获取节点对应真实节点
     */
    get elem() {
        let result = VNode.toDomNodeSync(this._elem ? new VNode("div", null, this._elem as any) : this.render());
        for (const key in this._props) {
            // 如果节点存在该属性 则添加
            let _key = /^on[A-Z]*/.test(key) ? key.toLowerCase() : key;
            if (_key in result) result[_key] = this._props[key];
        }
        return result;
    }
    /**
     * @desc 设置节点对应真实节点
     */
    set elem(v) {
        v && (this._elem = v);
    }

    private _props
    /**
     * @desc 设置节点属性
     */
    set props(v) {
        this._props = v;
    }
    /**
     * @desc 获取节点属性
     */
    get props() {
        return this._props;
    }
}
/**
 * @desc 虚拟节点
 */
export class VNode {
    /**
     * @desc 构造一个节点
     * @param type 节点类型 字符串（代表HTML 原生节点） | null | 函数 （代表控件）
     * @param prop 属性
     * @param children 子节点
     */
    constructor(public type: string | null | (new () => Control), public props: any | { [name: string]: any } | null, public children?: VNode[]) { }
    /**
     * 添加一个或多个子节点。
     * @param child 要添加的子内容。
     */
    append(child: any) {
        if (child == null) {
            return;
        }
        if (Array.isArray(child)) {
            for (const item of child) {
                this.append(item);
            }
        } else {
            this.children!.push(child instanceof VNode ? child : new VNode(null, child));
        }
    }
    /**
     * 创建一个虚拟节点。
     * @param type 节点类型。如果是字符串表示 HTML 原生节点；如果是 null 表示文本节点；如果是函数表示控件。
     * @param props 节点属性。如果是文本节点则表示节点内容。
     * @param children 所有子内容。
     * @return 返回创建的虚拟节点。
     */
    static create(type: VNode["type"], props: VNode["props"], ...children: any[]) {
        const r = new VNode(type, props, []);
        r.append(children);
        return r;
    }

    /**
     * @desc 同步生成节点对应的真实节点
     * @param 新的VNode
     * @param 旧的VNode
     */
    static toDomNodeSync(vNode: VNode) {
        const type = vNode.type;
        const attrs = vNode.props;
        const children = vNode.children;
        let _node;
        switch (typeof type) {
            case "function":
                // 组件
                const _type = new (type as any)();
                _type.props = attrs;
                _type.elem = children && children.length ? children : null
                _node = _type.elem;
                break;
            case "string":
                // 原生节点
                _node = DOM.createElement(type, attrs);
                if (children && children.length) {
                    for (const child of children) {
                        _node.append(this.toDomNodeSync(child));
                    }
                }
                break;
            default:
                // 字符串
                _node = DOM.createTextNode(attrs);
                if (children && children.length) {
                    for (const child of children) {
                        _node.append(this.toDomNodeSync(child));
                    }
                }
                break;
        }
        return _node;
    }
    /**
     * @desc 生成的真实节点 或者 控件
     */
    result: HTMLElement | Text | Control;

}

export function bind(): any { }
/**
 * @desc 渲染节点
 */
export function render(vNode, target) {
    let result
    // 控件／原生节点
    target.innerHTML = ""
    if (vNode instanceof VNode) {
        if (!vNode.result) vNode.result = VNode.toDomNodeSync(vNode)
        result = vNode.result || null;
        target.appendChild(result);
        return;
    }
    // 文本节点
    result = DOM.createTextNode(vNode);
    target.appendChild(result);
}