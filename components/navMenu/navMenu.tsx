import Control, { render, VNode } from "./../control/control";
import * as DOM from "./../dom/dom"
import "./navMenu.scss";
export default class NavMenu extends Control {
    render() {
        return <div className="e-navmenu">
            
        </div>
    }
}

export class NavMenuItem extends Control {
    render() {
        return <div className="e-navmenuitem">
        
        </div>
    }
}