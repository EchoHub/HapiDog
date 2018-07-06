/// <reference path="jsx.d.ts" />
import * as DOM from "./../dom/dom"
import { gethashcode } from "./../util/util"

export enum ControlState {
    // 第一次家在
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
    // control 状态
    readyState
    /**
     * @desc 插入节点到指定节点中
     * @param target 目标节点
     */
    renderTo(target: Control | HTMLElement) {
        // 如果 目标节点存在 则 进行 添加操作
        if (target) {
            (target instanceof Control ? target.elem : target).appendChild(this.elem);
        }
        // else {
        // }
    }


    /**
     * @desc 节点渲染函数
     */
    protected render(children?: VNode[], props?: { [key: string]: any }): VNode | null;
    protected render() {
        return <div />
    }

    /**
     * 获取当前控件关联的虚拟节点。
     */
    protected vNode: VNode | null;

    /**
     * @desc 创建节点时对应的虚拟节点
     */
    sourceVNode

    /**
     * @desc 节点更新函数
     */
    update() {
        // 如果节点没有正在更新，则进行更新操作，并且把节点状态改为更新中
        if (this.readyState !== ControlState.rendering) {
            this.readyState = ControlState.rendering;
            const oldVNode = this.vNode;
            const newVNode = this.vNode = this.render();
            VNode.sync(newVNode, oldVNode);
            this.elem = newVNode.result;
        }
    }

    /**
     * @desc 初始化函数
     */
    init() {

    }

    /**
     * @desc 挂载函数
     */
    unmount() {

    }

    _elem
    get elem() {
        if (this.readyState !== ControlState.rendered) {
            this.update();
        }
        return this._elem
    }

    set elem(v) {
        this._elem = v;
    }
}

/**
 * @desc 虚拟节点
 */
export class VNode {

    constructor(public type: Control | string | null, public props: { [key: string]: any }, public children?: VNode[]) { }

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
     * @desc 同步节点
     * @param newVNode 新节点
     * @param oldVNode 源节点
     */
    static sync(newVNode, oldVNode?) {
        // 节点类型
        const type = newVNode.type;
        // 是否是自定义组件
        const isControl = typeof type === "function";
        // 是否进行重新渲染
        let recreated = !oldVNode || !oldVNode.props || oldVNode && newVNode && oldVNode.props && newVNode.props && oldVNode.props.id !== newVNode.props.id;
        // 对应的节点 control | node | textnode
        const result = newVNode.result = recreated ? type ? isControl ? new (type as new () => Control) : document.createElement(type as string) : document.createTextNode(newVNode.props) : oldVNode.result;
        // 如果 type 存在 则为 control | node，否则为 textnode
        if (type) {
            // 判断是否为control
            console.log(newVNode.props, result);
            if (isControl) {
                result.sourceVNode = newVNode;
            } else {

            }
            // 获取对应的节点
            const body = result instanceof Control ? result.elem : result;
            if (body) {
                const children = newVNode.children && newVNode.children.length ? newVNode.children : [];
                // 如果 节点不需要更新则 比较原节点的子集 进行替换
                children && children.forEach((d, i) => {
                    if (!recreated) {
                        const oldChildren = oldVNode.children;
                        VNode.sync(d, oldChildren[i]);
                    } else {
                        VNode.sync(d);
                    }

                    if (d.result instanceof Control) {
                        (d.result).renderTo(result);
                    } else {
                        (result instanceof Control ? result.elem : result).appendChild(d.result);
                    }
                });
            }

        } else {
            if (!recreated && oldVNode.props !== newVNode.props) (result as Text).textContent = newVNode.props;
        }
    }

    // 对应的节点
    result: Control | HTMLElement | Text;
}

export type NodeLike = VNode | Control | Node | Text | null;

export function from(content) {
    if (!content) return;
    if (content instanceof VNode) {
        VNode.sync(content);
        content = content.result;
    }
    return content;
}

/**
 * @desc 渲染指定内容到目标节点
 * @param content 内容节点
 * @param target 目标节点
 */
export function render(content: NodeLike, target: Control | HTMLElement) {
    content = from(content);
    if (content instanceof Control) content.renderTo(target);
    else {
        (target instanceof Control ? (target as Control).elem : target).appendChild(content);
    }
}