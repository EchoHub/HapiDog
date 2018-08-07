import Control, { render, VNode } from "./control/control";
import "./common.scss";
import Button from "./button/button";

import "./../assets/styles/home.scss";
const containerNode = document.getElementById('root');
class Text extends Control {

    protected render() {
        return <div className="text" onClick={(e) => { console.log(e)}}>
            <Button className="hp-button-primary">按钮</Button>
            <div className="tip">111</div>
            <div className="tip">2222<span id="span">111</span></div>
            <div><Button className="hp-button-light">按钮</Button></div>
        </div>
    }
}
render(<Text id="e-home"></Text>, containerNode);