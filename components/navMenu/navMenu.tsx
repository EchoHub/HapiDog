// import Control, { render, VNode } from "./../control/control";
// import * as DOM from "./../dom/dom"
// import "./navMenu.scss";
// export default class NavMenu extends Control {
//     render() {
//         return <div className="e-navmenu">{this.children}</div>
//     }
// }
// export class SubMenu extends Control {
//     constructor(props, children) {
//         super(props, children);
//         this.state = {
//             collpased: true
//         }
//     }
//     toggleHandle = () => {
//         this.setState({
//             collpased: !this.state.collpased
//         });
//     }
//     render() {
//         return <div className={`e-submenu ${this.state.collpased ? "e-submenu_collapsed" : ""}`}>
//             <div
//                 className="e-submenu_title"
//                 onClick={this.toggleHandle}>{this.props.title}
//                 <i className={"icon iconfont e-float-right e-submenu_title_flag"}></i>
//             </div>
//             <div className="e-submenu_list">{this.children}</div>
//         </div>
//     }
//     init() {
//     }
// }
// export class NavMenuItem extends Control {
//     constructor(props, children) {
//         super(props, children);
//     }
//     render() {
//         return <div className="e-navmenuitem">{this.children}</div>
//     }
// }