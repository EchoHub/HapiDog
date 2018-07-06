import Control, { render, VNode } from "./../control/control";
import * as DOM from "./../dom/dom"
import "./button.scss";
export default class Button extends Control{
    render() {
        return <button type="button" className="e-button"></button>
    }
}

export class ButtonGroup extends Control {

    render() {
        return <div className="e-buttongroup"></div>
    }

    init() {
    }
}

// import Control, { render, VNode } from "./../control/control";
// import * as DOM from "./../dom/dom"
// import "./button.scss";
// export default class Button extends Control{
//     constructor(props, children) {
//         super(props, children);
//     }
//     render() {
//         return <button type="button" className="e-button">{this.children}</button>
//     }
// }

// export class ButtonGroup extends Control {
//     constructor(props, children) {
//         super(props, children);
//         // 主题 default | normal | info | error | warning | light
//         // 按钮组尺寸 large | normal | small | mini
//     }

//     render() {
//         return <div className="e-buttongroup">{this.children}</div>
//     }

//     init() {
//     }
// }