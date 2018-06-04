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
}