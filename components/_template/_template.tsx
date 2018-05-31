import Control, { render, VNode } from "./../control/control";
import * as DOM from "./../dom/dom"
import "./_template.scss";
export default class Template extends Control{
    render() {
        return <div className="e-template"></div>
    }

}