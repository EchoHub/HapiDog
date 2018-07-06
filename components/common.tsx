import Control, { render, VNode } from "./control/control";
import "./common.scss";
import Button, { ButtonGroup } from "./button/button";

import "./../assets/styles/home.scss";
const containerNode = document.getElementById('root');
class Text extends Control {

    protected render() {
        return <div className="text">
            <Button>按钮</Button>
            <div>111</div>
            <div><Button>按钮</Button></div>
        </div>
    }
}
render(<Text id="e-home"></Text>, containerNode);