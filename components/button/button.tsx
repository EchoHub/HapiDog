import Control, { render, VNode } from "./../control/control";
import * as DOM from "./../dom/dom"
import "./button.scss";
export default class Button extends Control{
    render() {
        return <button type="button" className="e-button"></button>
    }
}

export class ButtonGroup extends Control {
    constructor(props) {
        super(props);
        // 主题 default | normal | info | error | warning | light
        // 按钮组尺寸 large | normal | small | mini
    }

    render() {
        return <div className="e-buttongroup"></div>
    }

    init() {
        console.log(this)
    }
}