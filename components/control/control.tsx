/// <reference path="jsx.d.ts" />
import * as DOM from "./../dom/dom"
export enum ControlState {
    /**
     * 初始状态
     */
    initial = 1,
    /**
     * 需要重新渲染
     */
    invalidate = 2,
    /**
     * 正在渲染
     */
    rendering = 3,
    /**
     * 渲染结束
     */
    rendered = 4
}
/**
 * @desc 表示一个控件基类
 */
export default class Control {

    /**
     * @desc 节点状态
     */
    private readState

    render() {
        return <div></div>
    }
    /**
     * @desc 更新节点
     */
    update = () => {
        let result = VNode.toDomNodeSync(this.render());
        for (const key in this._props) {
            // 如果节点存在该属性 则添加
            let _key = /^on[A-Z]*/.test(key) ? key.toLowerCase() : key;
            // if (_key in result) result.setAttribute(_key,  this._props[key]);
            if (_key in result) (/^on[A-Z]*/.test(key) || /^className$/.test(key)) ? result[_key] = this._props[key]: result.setAttribute(_key, this._props[key]);
        }
        // 替换原来的节点
        if(this._elem && this._elem.parentNode) {
            this._elem.parentNode.replaceChild(result, this._elem)
        }
        this.readState = ControlState.rendered;
        this._elem = result;
    }

    /**
     * @desc 初始化完成 类似 componenntDidMount
     */
    init() {
        console.log(new Date())
    }
    /**
     * @desc 组件卸载 类型 componentWillUnmount
     */
    uninit() {
    }
    // 对应的原生节点
    private _elem: HTMLElement;
    /**
     * @desc 获取节点对应真实节点
     */
    get elem() {
        if (this.readState !== ControlState.rendered) {
            this.readState = ControlState.rendering;
            this.update();
        }
        return this._elem;
    }
    /**
     * @desc 设置节点对应真实节点
     */
    set elem(v) {
        this.readState = ControlState.rendered;
        const oldElem = this._elem;
        // 如果不一样则重新赋值
        if (oldElem != v) {
            this._elem = v;
            const parent = oldElem.parentNode;
            if (parent) v ? parent.replaceChild(v, oldElem) : parent.removeChild(oldElem);
        }
        // 如果一样 重新进行初始化操作
        v && this.init();
    }

    private _props
    /**
     * @desc 设置节点属性
     */
    set props(v) {
        if (v && Object.keys(v).length) {
            // 验证 props是否发生变化 如果发生变化则重新渲染节点
            if (this._props) {
                // 如果 属性有新增／删除 则直接重新渲染
                if (Object.keys(this._props).length !== Object.keys(v).length) {
                    this._props = v;
                    // 若节点未渲染完成 则 不进行节点渲染
                    this.readState = ControlState.invalidate && this.update();
                    return;
                }
                // 如果属性值发生变化，则重新渲染
                for (const key in v) {
                    if (v[key] !== this._props[key]) {
                        this._props = v;
                        // 若节点未渲染完成 则 不进行节点渲染
                        this.readState = ControlState.invalidate && this.update();
                        return;
                    }
                }
            } else {
                this._props = v;
                // 若节点未渲染完成 则 不进行节点渲染
                this.readState === ControlState.rendered && this.update();
            }

        }

    }
    /**
     * @desc 获取节点属性
     */
    get props() {
        return this._props;
    }

    /**
     * @desc 类名 className
     */
    private _class
    get class() {
        return this._class
    }

    set class(v) {
        this._class = v;
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
        console.log(vNode)
        switch (typeof type) {
            case "function":
                // 组件
                const _type = new (type as any)();
                _type.props = attrs;
                if(children && children.length) {
                    for(const child of children) _type.elem.appendChild(this.toDomNodeSync(child));
                }
                _node = _type.elem;
                break;
            case "string":
                // 原生节点
                _node = DOM.createElement(type, attrs);
                if (children && children.length) {
                    for (const child of children) {
                        _node.appendChild(this.toDomNodeSync(child));
                    }
                }
                break;
            default:
                // 字符串
                _node = DOM.createTextNode(attrs);
                if (children && children.length) {
                    for (const child of children) {
                        _node.appendChild(this.toDomNodeSync(child));
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
        result && target.appendChild(result);
        return;
    }
    // 文本节点
    result = DOM.createTextNode(vNode);
    target.appendChild(result);
}