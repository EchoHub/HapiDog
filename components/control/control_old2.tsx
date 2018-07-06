// / <reference path="jsx.d.ts" />
// import * as DOM from "./../dom/dom"
// import { gethashcode } from "./../util/util"
// // 状态更新的节点
// export enum ControlState {
//     /**
//      * 初始状态
//      */
//     initial = 1,
//     /**
//      * 需要重新渲染
//      */
//     invalidate = 2,
//     /**
//      * 正在渲染
//      */
//     rendering = 3,
//     /**
//      * 渲染结束
//      */
//     rendered = 4
// }
// /**
//  * @desc 表示一个控件基类
//  */
// export default class Control {

//     // control 状态
//     _readState = ControlState.initial;

//     protected render(children?: VNode[], props?: { [key: string]: any }): VNode | null;
//     protected render() {
//         return <div />
//     }
//     /**
//      * @desc 组件加载完成 初始化
//      */
//     componentDidMount() {

//     }
//     /**
//      * @desc 组件销毁
//      */
//     componentUnmount() {

//     }


//     renderTo(parent: Control | Node | null) {
//         console.log(parent)
//     }

//     /**
//      * @desc 更新节点
//      */
//     update = () => {
//         if (this._readState !== ControlState.rendering) {
//             const oldVNode = this.vNode;
//             const newVNode = this.sourceVNode ?
//                 this.render(this.sourceVNode.children || [], this.sourceVNode.props || []) : this.render();
//             VNode.sync(newVNode, oldVNode);
//             const result = newVNode.result;
//             this.elem = typeof newVNode.type === "function" ? (result as Control).elem : result as HTMLElement;
//         }
//     }

//     // 对应的真实节点
//     _elem
//     get elem() {
//         if (this._readState !== ControlState.rendered) {
//             this.update();
//         }
//         return this._elem;
//     }

//     set elem(v) {
//         this._readState = ControlState.rendered;
//         const oldElem = this._elem;
//         if (v != oldElem) {
//             if (oldElem) {
//                 this.componentUnmount()
//                 const parentNode = oldElem.parentNode;
//                 if (parentNode) {
//                     if (v) parentNode.replaceChild(v, oldElem)
//                     else parentNode.removeChild(oldElem)
//                 }
//                 return;
//             }
//             this._elem = v && this.componentDidMount();
//         }
//     }

//     // 对应的vNode
//     vNode

//     // 源节点
//     sourceVNode: VNode
// }

// /**
//  * 表示更新的类型。
//  */
// export const enum Changes {

//     /**
//      * 没有任何改变。
//      */
//     none,

//     /**
//      * 类型发生改变。根节点已重新创建。
//      */
//     type = 1,

//     /**
//      * 状态发生改变。控件已重新渲染。
//      */
//     state = 2,

//     /**
//      * 属性发生改变。
//      */
//     prop = 3,

//     /**
//      * 子控件或元素发生改变。
//      */
//     children = 4,

// }

// /**
//  * @desc 虚拟节点
//  */
// export class VNode {

//     /**
//      * @desc 构造一个节点
//      * @param type 节点类型 字符串（代表HTML 原生节点） | null | 函数 （代表控件）
//      * @param prop 属性
//      * @param children 子节点
//      */
//     constructor(public type: string | null | (new () => Control), public props: any | { [name: string]: any } | null, public children?: VNode[]) { }
//     /**
//      * 添加一个或多个子节点。
//      * @param child 要添加的子内容。
//      */
//     append(child: any) {
//         if (child == null) {
//             return;
//         }
//         if (Array.isArray(child)) {
//             for (const item of child) {
//                 this.append(item);
//             }
//         } else {
//             this.children!.push(child instanceof VNode ? child : new VNode(null, child));
//         }
//     }
//     /**
//      * 创建一个虚拟节点。
//      * @param type 节点类型。如果是字符串表示 HTML 原生节点；如果是 null 表示文本节点；如果是函数表示控件。
//      * @param props 节点属性。如果是文本节点则表示节点内容。
//      * @param children 所有子内容。
//      * @return 返回创建的虚拟节点。
//      */
//     static create(type: VNode["type"], props: VNode["props"], ...children: any[]) {
//         const r = new VNode(type, props, []);
//         r.append(children);
//         return r;
//     }

//     /**
//      * @desc 同步生成节点对应的真实节点
//      * @param oldNode 原节点
//      * @param newNode 新节点
//      * @return 返回 节点状态
//      */
//     static sync(newVNode: VNode | null, oldVNode?: VNode): Changes {
//         const type = newVNode.type;
//         const isControl = typeof type === "function";
//         // 是否要进行 重新创建
//         const recreated = !oldVNode || !oldVNode.result || type !== oldVNode.type || type && newVNode.props && oldVNode.props && newVNode.props.id && oldVNode.props.id && newVNode.props.id !== oldVNode.props.id;
//         const result = newVNode.result = recreated ? type ? isControl ? new (type as (new () => Control))() : document.createElement(type as string) : document.createTextNode(newVNode.props) : oldVNode!.result;
//         let r = recreated ? Changes.type : Changes.none;
//         console.log("----> ",result)
//         if (type) {
//             if (isControl) { // 自定义节点
//                 // 更新节点对应的虚拟源节点
//                 console.log(result, "<-----");
//                 (result as Control).sourceVNode = newVNode;
//             } else {
//                 // 原生节点
//             }
//         } else {
//             // 文本节点
//             if (!recreated && oldVNode.props !== newVNode.props) {
//                 (result as Text).textContent = newVNode.props;
//             }
//         }
//         return r;
//     }
//     /**
//      * @desc 生成的真实节点 或者 控件
//      */
//     result: HTMLElement | Text | Control;

// }

// /**
//  * @desc 格式化节点
//  * @desc source 节点来源
//  */
// function from(source: VNode | HTMLElement) {
//     if (!source) return null;
//     if (source instanceof VNode) {
//         if (!source.result) VNode.sync(source);
//         const result = source.result;
//         return result instanceof Control ? result.elem : result;
//     }
//     return source as HTMLElement | Text | DocumentFragment;
// }
// /**
//  * 
//  * @param content 内容节点
//  * @param target 目标节点
//  */
// export function render(content: VNode, target: HTMLElement | VNode) {
//     const source = from(content);
//     const container = from(target);
//     if (!container || !source) {
//         console.error("哈皮错误提示：", "节点丢失...");
//         return null;
//     }
//     container && (container as HTMLElement).appendChild(source)
// }
