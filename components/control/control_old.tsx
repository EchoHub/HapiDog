// /// <reference path="jsx.d.ts" />
// import * as DOM from "./../dom/dom"
// import { gethashcode } from "./../util/util"
// // 节点集合
// let $$state = []
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
//      * 状态变化
//      */
//     stateUpdate = 4,
//     /**
//      * 渲染结束
//      */
//     rendered = 5
// }
// /**
//  * @desc 表示一个控件基类
//  */
// export default class Control {
//     constructor(props, children?: Array<VNode>) {
//         this.props = props;
//         this.children = children;
//     }
//     /**
//      * @desc 节点状态
//      */
//     private _readyState;
//     set readState(v) {
//         v && (this._readyState = v);
//     }

//     render() {
//         return <div>{this.children}</div>
//     }

//     // 元素子集
//     protected children: Array<VNode>

//         /**
//      * @desc diff 算法实现
//      * @param oldNode 原节点
//      * @param newNode 新节点
//      * @param parentNode 父节点
//      */
//     private soutceNode: Node;
//     private diff = (oldNode: Node, newNode: Node, parentNode: Node) => {
//         // 若 原节点无 新节点有 则直接新增 ，反之 直接删除
//         if (!oldNode) {
//             newNode && parentNode && parentNode.appendChild(newNode);
//             return;
//         }
//         let result;
//         const oldElem = (oldNode as HTMLElement);
//         const newElem = (newNode as HTMLElement);
//         const oldNodeTag = oldElem.tagName;
//         const newNodeTag = newElem.tagName;
//         // tag不一致 直接替换
//         // if (!oldNode.isEqualNode(newNode)) {
//         if (oldNodeTag !== newNodeTag || newNode.nodeType !== 1) {
//             const result = newNode.cloneNode();
//             parentNode.replaceChild(result, oldElem);
//         } else {
//             // tag一致 影响因素 属性 不替换， 子元素变化 直接替换子元素
//             const oldAttrNames = (oldElem as any).getAttributeNames();
//             const newAttrNames = (newElem as any).getAttributeNames();
//             const attrs = newAttrNames.concat(oldAttrNames);
//             for (const item of attrs) {
//                 oldElem.setAttribute(item, newElem.getAttribute(item) !== undefined ? newElem.getAttribute(item) : oldElem.getAttribute(item));
//             }
//             // 判断子节点
//             const old_hasChildren = oldNode.hasChildNodes();
//             const new_hasChildren = newNode.hasChildNodes();
//             if (old_hasChildren && new_hasChildren) {
//                 let _index = 0;
//                 const oldChildren = oldNode.childNodes as any;
//                 const newChildren = newNode.childNodes as any;
//                 for (const item of oldChildren) {
//                     for (const ite of newChildren) {
//                         this.diff(oldChildren[_index], newChildren[_index], oldNode);
//                     }
//                     _index++;
//                 }
//             } else if (old_hasChildren && !new_hasChildren) {
//                 for (const item of (oldNode.childNodes as any)) parentNode && parentNode.removeChild(item)
//             } else if (!old_hasChildren && new_hasChildren) {
//                 for (const item of (newNode.childNodes as any)) parentNode && parentNode.appendChild(item)
//             }
//             this._elem = oldElem;
//         }
//     }

//     /**
//      * @desc 更新节点
//      */
//     private parentNode: Node
//     private $$id
//     update = () => {
//         const vNode = this.render();
//         const result = VNode.toDomNodeSync(vNode, this.alwaysUpdate === ControlState.initial ? 1 : this._readyState);
//         if (this._readyState !== ControlState.rendering) {
//             for (const key in this._props) {
//                 // 如果节点存在该属性 则添加
//                 let _key = /^on[A-Z]*/.test(key) ? key.toLowerCase() : key;
//                 if (_key in result) /^on[A-Z]*/.test(key) ? result[_key] = this._props[key]
//                     : /^className$/.test(key) ? result[_key] = (result[_key] ? result[_key] : "").concat(" " + this._props[key] || "")
//                         : result.setAttribute(_key, this._props[key]);
//             }
//             this._readyState = ControlState.rendered;
//             this.elem = result;
//             // 元素装载完成，执行初始化操作
//             if (this.alwaysUpdate === ControlState.initial) {
//                 this.$$id = gethashcode();
//                 $$state.push({
//                     $$id: this.$$id,
//                     vNode: this,
//                     state: this.state
//                 });
//                 this.init();
//             }
//         }
//     }


//     /**
//      * @desc 初始化完成 类似 componenntDidMount
//      */
//     init() {
//         // console.log(`这是 ${(this as any).__proto__.constructor.name} 组件加载完成初始化函数：`, new Date().toLocaleString());
//     }
//     /**
//      * @desc 组件卸载 类型 componentWillUnmount
//      */
//     uninit() {
//     }
//     // 对应的原生节点
//     private _elem: HTMLElement;
//     /**
//      * @desc 获取节点对应真实节点
//      */
//     private alwaysUpdate: Number;
//     get elem() {
//         if (this._readyState !== ControlState.rendered) {
//             this.alwaysUpdate = this._readyState
//             this._readyState = ControlState.invalidate
//             this.update();
//         }
//         this._readyState = ControlState.rendered;
//         return this._elem;
//     }
//     /**
//      * @desc 设置节点对应真实节点
//      */
//     set elem(v) {
//         const oldElem = this._elem;
//         // 如果不一样则重新赋值
//         if (oldElem != v) {
//             this._elem = v;
//             const parent = oldElem && oldElem.parentNode || null;
//             this.diff(oldElem, v, parent);
//         }
//     }

//     private _props
//     /**
//      * @desc 设置节点属性
//      */
//     set props(v) {
//         if (v && Object.keys(v).length) {
//             // 验证 props是否发生变化 如果发生变化则重新渲染节点
//             if (this._props) {
//                 // 如果 属性有新增／删除 则直接重新渲染
//                 if (Object.keys(this._props).length !== Object.keys(v).length) {
//                     this._props = v;
//                     this._readyState = ControlState.invalidate && this.update();
//                     return;
//                 }
//                 // 如果属性值发生变化，则重新渲染
//                 for (const key in v) {
//                     if (v[key] !== this._props[key]) {
//                         this._props = v;
//                         this._readyState = ControlState.invalidate && this.update();
//                         return;
//                     }
//                 }
//             } else {
//                 this._props = v;
//                 // 若节点未渲染完成 则 不进行节点渲染
//                 this._readyState === ControlState.rendered && this.update();
//             }
//         }

//     }
//     /**
//      * @desc 获取节点属性
//      */
//     get props() {
//         return this._props;
//     }

//     /**
//      * @desc 类名 className
//      */
//     private _class: Array<String>
//     get class() {
//         return this._class
//     }

//     set class(v: Array<String>) {
//         this._class = v;
//     }
//     protected state: { [key: string]: string | number | Object | any }
//     // 状态赋值
//     setState(v: { [key: string]: string | number | Object | any }) {
//         if (!v) return;
//         if (Object.keys(v).length) {
//             for (const key in v) {
//                 if (v[key] !== this.state[key]) {
//                     this.state[key] = v[key];
//                     this._readyState === ControlState.rendered && (this._readyState = ControlState.stateUpdate);
//                 }
//             }
//             if (this._readyState === ControlState.stateUpdate) {
//                 this.alwaysUpdate = this._readyState;
//                 this.update();
//             }
//         }
//     }
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
//      * @param vNode VNode
//      * @param isInitial 是否是初次加载
//      */
//     static toDomNodeSync(vNode: VNode, controlState?: Number) {
//         const type = vNode.type;
//         const attrs = vNode.props;
//         const children = vNode.children;
//         let _node;
//         switch (typeof type) {
//             case "function":
//                 // 组件
//                 const _control = new (type as any)(attrs, children, controlState === ControlState.initial ? true : false);
//                 _control.readState = controlState === ControlState.initial ? ControlState.initial : ControlState.invalidate;
//                 _node = _control.elem;
//                 break;
//             case "string":
//                 // 原生节点
//                 _node = DOM.createElement(type, attrs);
//                 if (children && children.length) {
//                     for (const child of children) {
//                         const _child = this.toDomNodeSync(child,controlState);
//                         _child && _node.appendChild(_child);
//                     }
//                 }
//                 break;
//             default:
//                 // 字符串
//                 _node = DOM.createTextNode(attrs);
//                 break;
//         }
//         vNode.result = _node;
//         return _node;
//     }
//     /**
//      * @desc 生成的真实节点 或者 控件
//      */
//     result: HTMLElement | Text | Control;

// }
// /**
//  * @desc 渲染节点
//  */
// export function render(vNode, target) {
//     let result
//     // 控件／原生节点
//     target.innerHTML = ""
//     if (vNode instanceof VNode) {
//         if (!vNode.result) vNode.result = VNode.toDomNodeSync(vNode, 1);
//         result = vNode.result || null;
//         result && target.appendChild(result);
//         return;
//     }
//     // 文本节点
//     result = DOM.createTextNode(vNode);
//     target.appendChild(result);
// }

// /**
//  * 绑定属性
//  */
// // export function bind(): PropertyDecorator;

// // export function bind(target?: any, propertyName?: string, selector?: any, prop?: string, args?: any, descriptor?: PropertyDecorator) {
// //     return function(control) {
// //         console.log(control);
// //     }
// // }
// // export function bind(onChange?: any | Function | String)
// // {
// //     if (onChange == null)
// //     {
// //         return;
// //     }
// //     return (target: any, propertyKey: string) =>
// //     {
// //         //get方法
// //         var key = "_" + propertyKey;
// //         var get;
// //         get = function () { return this[key]; };
// //         //set方法
// //         var set;
// //         set = function (value)
// //         {
// //             if (this[key] === value)
// //                 return;
// //             var oldValue = this[key];
// //             this[key] = value;
// //             //回调方法
// //             var type = typeof onChange;
// //             if (type == "function")
// //             {
// //                 onChange(propertyKey, oldValue, this[key]);
// //             } else if (type == "string" && this[onChange] != null)
// //             {
// //                 this[onChange](propertyKey, oldValue, this[key]);
// //             } else
// //             {
// //                 console.log("watch:类" + target.constructor.name + "不存在方法：" + onChange);
// //             }
// //         }
// //         //属性设置
// //         Object.defineProperty(target, propertyKey, {
// //             get: get,
// //             set: set,
// //             enumerable: true,
// //             configurable: true
// //         });
// //     }
// // }