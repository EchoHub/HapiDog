import Control, { render, VNode } from "control/control";
const containerNode = document.getElementById('root');
class Home extends Control {
    constructor() {
        super()
    }
    render() {
        return <div>
            Home
        </div>
    }
}
render(<Home id="e-home">
    <div onClick={event => { alert("这是一个点击事件1"); }}>组合组件</div>
    <Home 
        id="e-home_second"
        onClick={event => { alert("这是一个点击事件2"); }}
    ></Home>
</Home>, containerNode);