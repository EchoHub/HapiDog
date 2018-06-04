import Control, { render, VNode } from "./control/control";
import Button, { ButtonGroup } from "./button/button";
import "./common.scss";
import "./../assets/styles/home.scss";
const containerNode = document.getElementById('root');
class Home extends Control {
    constructor() {
        super()
    }
    private node
    private className
    buttonClick = () => {
        alert("这是一个按钮")
    }
    render() {
        return <div className="e-home">
            <section className="e-section button-section">
                <fieldset className="e-section-fieldset">
                    <legend>按钮主题</legend>
                    <div>
                        <Button className="e-button e-button-default e-button-margin" onClick={this.buttonClick}>样式一</Button>
                        <Button className="e-button e-button-primary e-button-margin">样式二</Button>
                        <Button className="e-button e-button-info e-button-margin">样式三</Button>
                        <Button className="e-button e-button-error e-button-margin">样式四</Button>
                        <Button className="e-button e-button-warning e-button-margin">样式五</Button>
                        <Button className="e-button e-button-light e-button-margin">样式六</Button>
                        <Button className="e-button e-button-light e-button-margin" disabled>样式七</Button>
                    </div>
                </fieldset>
                <fieldset className="e-section-fieldset">
                    <legend>按钮尺寸</legend>
                    <div>
                        <Button className="e-button e-button-default large e-button-margin" onClick={this.buttonClick}>大型按钮</Button>
                        <Button className="e-button e-button-default normal e-button-margin">正常按钮</Button>
                        <Button className="e-button e-button-default small e-button-margin">小型按钮</Button>
                        <Button className="e-button e-button-default mini e-button-margin">迷你按钮</Button>
                    </div>
                    <div>
                        <Button className="e-button e-button-primary large e-button-margin" onClick={this.buttonClick}>大型按钮</Button>
                        <Button className="e-button e-button-primary normal e-button-margin">正常按钮</Button>
                        <Button className="e-button e-button-primary small e-button-margin">小型按钮</Button>
                        <Button className="e-button e-button-primary mini e-button-margin">迷你按钮</Button>
                    </div>
                    <div>
                        <Button className="e-button e-button-light large e-button-margin" onClick={this.buttonClick}>大型按钮</Button>
                        <Button className="e-button e-button-light normal e-button-margin">正常按钮</Button>
                        <Button className="e-button e-button-light small e-button-margin">小型按钮</Button>
                        <Button className="e-button e-button-light mini e-button-margin">迷你按钮</Button>
                    </div>
                    <div>
                        <div className="e-mt-10 e-fixed-width-200"><Button className={`e-button e-button-light e-button-fluid ${this.className}`}>流体按钮</Button></div>
                    </div>
                </fieldset>
                <fieldset className="e-section-fieldset">
                    <legend>图标按钮</legend>
                    <div>
                        <Button className="e-button e-button-default circle large e-button-margin" onClick={this.buttonClick}><i className="icon iconfont">&#xe6dd;</i></Button>
                        <Button className="e-button e-button-primary circle normal e-button-margin"><i className="icon iconfont">&#xe6f8;</i></Button>
                        <Button className="e-button e-button-info circle small e-button-margin"><i className="icon iconfont">&#xe6ee;</i></Button>
                        <Button className="e-button e-button-error circle mini e-button-margin"><i className="icon iconfont">&#xe6fd;</i></Button>
                        <Button className="e-button e-button-warning circle mini e-button-margin"><i className="icon iconfont">&#xe708;</i></Button>
                        <Button className="e-button e-button-light circle mini e-button-margin"><i className="icon iconfont">&#xe71c;</i></Button>
                    </div>
                </fieldset>
                <fieldset className="e-section-fieldset">
                    <legend>按钮组</legend>
                    <div>
                        <ButtonGroup>
                            <Button className="e-button e-button-primary normal">正常按钮</Button>
                            <Button className="e-button e-button-primary normal">正常按钮</Button>
                            <Button className="e-button e-button-primary normal">正常按钮</Button>
                        </ButtonGroup>
                    </div>
                </fieldset>
            </section>
        </div>
    }
}

render(<Home id="e-home"></Home>, containerNode);