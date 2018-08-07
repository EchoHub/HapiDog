/// <reference path="jsx.d.ts" />
import * as DOM from "./../dom/dom"

/**
 * @desc 控制器状态
 */
export enum ControlState {
    // 第一次加载
    initial = 1,

    // 需要更新
    invalidate = 2,

    // 正在渲染
    rendering = 3,

    // 渲染完成
    rendered = 4
}
/**
 * @desc 自定义组件基类
 */
export default class Control {
    // 组件状态
    _readState

    protected render(children?: VNode[], props?: { [key: string]: any }): VNode | null;
    protected render() {
        return <div />
    }

    // 更新组件
    update = () => {
        if (this._readState !== ControlState.rendering) {
            this._readState = ControlState.rendering;
            const newVNode = this.sourceVNode ? this.render(this.sourceVNode || [], this.sourceVNode.props || {}) : this.render();
            const oldVNode = this.sourceVNode;
            VNode.sync(newVNode, oldVNode);
            const result = newVNode.result;
            this._elem = typeof newVNode.type === "function" ? (result as Control).elem : result as HTMLElement;
        }
    }


    private _elem: Node | Text | null;
    set elem(v) {
        this._elem = v;
    }

    get elem() {
        if (this._readState !== ControlState.rendered) {
            this._readState = ControlState.invalidate;
            this.update();
        }
        return this._elem;
    }

    set props(v) {
        if (v && Object.keys(v).length) {
            for (const key in v) {
                (this._elem as HTMLElement).setAttribute(key, v[key]);
            }
        }
    }

    // 对应的虚拟节点
    sourceVNode
}
/**
 * @desc 虚拟节点
 */
export class VNode {

    constructor(public type: new () => Control | string | null, public props: { [key: string]: any }, public children?: VNode[]) { }

    /**
     * @desc 添加子集
     * @param child 子集
     */
    protected append(child?) {
        if (!child) return null;
        if (Array.isArray(child)) {
            for (const item of child) this.append(item);
        } else {
            this.children.push(child instanceof VNode ? child : new VNode(null, child));
        }
    }

    /**
     * @desc 创建一个虚拟节点
     * @param type 节点类型
     * @param props 节点属性
     * @param children 节点子集
     */
    static create(type: VNode["type"], props: VNode["props"], ...children: any[]) {
        const _ = new VNode(type, props, []);
        _.append(children);
        return _;
    }
    /**
     * 同步组件
     * @param newVNode 
     * @param oldVNode 
     */
    static sync(newVNode: VNode, oldVNode: VNode) {
        // 节点类型
        const type = newVNode.type;
        // 是否为Control对象
        const isControl = typeof type === "function";
        // 是否重新渲染
        const reload = !oldVNode || oldVNode && type !== oldVNode.type || newVNode && oldVNode && newVNode.props && oldVNode.props && newVNode.props !== oldVNode.props;
        // 创建同步节点
        const result = newVNode.result = reload ? type ? isControl ? new (type as new () => Control)() : document.createElement(type as any) : document.createTextNode(newVNode.props as any) : oldVNode.result;
        let body;
        if (type) {
            // 同步属性
            let props = {
                ...(oldVNode ? oldVNode.props : {}),
                ...newVNode.props
            }
            if (isControl) {
                result.sourceVNode = newVNode;
                newVNode.props = props;
            } else {
                for (const key in props) result.setAttribute(key, props[key]);
            }
        }
        body = result.elem || result;
        if (body) {
            const children = newVNode.children;
            const oldChildren = oldVNode ? oldVNode.children : null;
            if (children && children.length) {
                for (const key in children) {
                    const child = children[key];
                    const oldChild = oldChildren && oldChildren.length ? oldChildren[key] : null;
                    VNode.sync(child, oldChild);
                    const _child = (child.result as Control).elem || child.result;
                    body.appendChild(_child as any);
                }
            }
        }
    }

    // 对应的节点
    result: Control | Node | null
}

/**
 * @desc 渲染组件到指定容器
 * @param content 
 * @param target 
 */
export function render(content, target) {
    let result = null;
    if (content instanceof VNode) {
        VNode.sync(content, null);
        result = content.result;
    } else {
        result = document.createTextNode(content);
    }
    target && target.appendChild(result instanceof Control ? result.elem : result);
}