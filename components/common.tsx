import Control, { render, VNode } from "./control/control";
import Button, { ButtonGroup } from "./button/button";
import NavMenu, { NavMenuItem } from "./navMenu/navMenu";
import "./common.scss";
import "./../assets/styles/home.scss";
const containerNode = document.getElementById('root');
class Home extends Control {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: "事件一取消",
            buttonName2: "事件二取消",
            buttonName3: "事件三取消"
        }
    }
    private node
    private className
    buttonClick = () => {
        this.setState({
            buttonName: this.state.buttonName === "事件一取消" ? "事件一激活" : "事件一取消"
        })
    }
    buttonClickTwo = () => {
        this.setState({
            buttonName2: this.state.buttonName2 === "事件二取消" ? "事件二激活" : "事件二取消"
        })
    }
    buttonClickThree = () => {
        this.setState({
            buttonName3: this.state.buttonName3 === "事件三取消" ? "事件三激活" : "事件三取消"
        })
    }
    render() {
        return <div className="e-home">
            <div className="e-header">
                <ul className="e-header-nav e-float-left">
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe70f;</i></a></li>
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe72b;</i></a></li>
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe721;</i></a></li>
                </ul>
                <ul className="e-header-nav e-float-right">
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe723;</i></a></li>
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe710;</i></a></li>
                    <li><a href="javascripr:;"><i className="icon iconfont">&#xe72f;</i></a></li>
                </ul>
            </div>
            <div className="e-sidenav">
                <div className="e-nav-logo">HapiAdmin Pro</div>
                <NavMenu id="e-navmenu">
                    <NavMenuItem>首页</NavMenuItem>
                    <NavMenuItem>组件</NavMenuItem>
                    <NavMenuItem>应用</NavMenuItem>
                    <NavMenuItem>高级</NavMenuItem>
                    <NavMenuItem>用户</NavMenuItem>
                    <NavMenuItem>设置</NavMenuItem>
                </NavMenu>
            </div>
            <div className="e-container">
                <section className="e-section button-section">
                    <fieldset className="e-section-fieldset">
                        <legend>按钮主题</legend>
                        <div>
                            <Button className="e-button e-button-default e-button-margin">样式一</Button>
                            <Button className="e-button e-button-primary e-button-margin">样式二</Button>
                            <Button className="e-button e-button-info e-button-margin">样式三</Button>
                            <Button className="e-button e-button-error e-button-margin">样式四</Button>
                            <Button className="e-button e-button-warning e-button-margin">样式五</Button>
                            <Button className="e-button e-button-light e-button-margin">样式六</Button>
                            <Button className="e-button e-button-light e-button-margin" disabled>样式七</Button>
                        </div>
                    </fieldset>
                    <fieldset className="e-section-fieldset e-mt-10">
                        <legend>按钮尺寸</legend>
                        <div>
                            <Button className="e-button e-button-default large e-button-margin" >大型按钮</Button>
                            <Button className="e-button e-button-default normal e-button-margin">正常按钮</Button>
                            <Button className="e-button e-button-default small e-button-margin">小型按钮</Button>
                            <Button className="e-button e-button-default mini e-button-margin">迷你按钮</Button>
                        </div>
                        <div>
                            <Button className="e-button e-button-primary large e-button-margin" >大型按钮</Button>
                            <Button className="e-button e-button-primary normal e-button-margin">正常按钮</Button>
                            <Button className="e-button e-button-primary small e-button-margin">小型按钮</Button>
                            <Button className="e-button e-button-primary mini e-button-margin">迷你按钮</Button>
                        </div>
                        <div>
                            <Button className="e-button e-button-light large e-button-margin" >大型按钮</Button>
                            <Button className="e-button e-button-light normal e-button-margin">正常按钮</Button>
                            <Button className="e-button e-button-light small e-button-margin">小型按钮</Button>
                            <Button className="e-button e-button-light mini e-button-margin">迷你按钮</Button>
                        </div>
                        <div>
                            <div className="e-mt-10 e-fixed-width-200"><Button className={`e-button e-button-light e-button-fluid ${this.className}`}>流体按钮</Button></div>
                        </div>
                    </fieldset>
                    <fieldset className="e-section-fieldset e-mt-10">
                        <legend>图标按钮</legend>
                        <div>
                            <Button className="e-button e-button-default circle large e-button-margin" ><i className="icon iconfont">&#xe6dd;</i></Button>
                            <Button className="e-button e-button-primary circle normal e-button-margin"><i className="icon iconfont">&#xe6f8;</i></Button>
                            <Button className="e-button e-button-info circle small e-button-margin"><i className="icon iconfont">&#xe6ee;</i></Button>
                            <Button className="e-button e-button-error circle mini e-button-margin"><i className="icon iconfont">&#xe6fd;</i></Button>
                            <Button className="e-button e-button-warning circle mini e-button-margin"><i className="icon iconfont">&#xe708;</i></Button>
                            <Button className="e-button e-button-light circle mini e-button-margin"><i className="icon iconfont">&#xe71c;</i></Button>
                        </div>
                    </fieldset>
                    <fieldset className="e-section-fieldset e-mt-10">
                        <legend>按钮组</legend>
                        <div>
                            <ButtonGroup className="primary large">
                                <Button>正常按钮</Button>
                                <Button className="e-mh-10">正常按钮</Button>
                                <Button>正常按钮</Button>
                            </ButtonGroup>
                            <ButtonGroup className="e-mt-10 info normal">
                                <Button>正常按钮</Button>
                                <Button className="e-mh-10">正常按钮</Button>
                                <Button>正常按钮</Button>
                            </ButtonGroup>
                            <ButtonGroup className="e-mt-10 error small">
                                <Button>正常按钮</Button>
                                <Button className="e-mh-10">正常按钮</Button>
                                <Button>正常按钮</Button>
                            </ButtonGroup>
                            <ButtonGroup className="e-mt-10 light mini">
                                <Button>正常按钮</Button>
                                <Button className="e-mh-10">正常按钮</Button>
                                <Button>正常按钮</Button>
                            </ButtonGroup>
                        </div>
                    </fieldset>
                    <fieldset className="e-section-fieldset e-mt-10">
                        <legend>事件</legend>
                        <div>
                            <ButtonGroup className="primary large">
                                <Button onClick={this.buttonClick}>事件一</Button>
                                <Button className="e-mh-10" onClick={this.buttonClickTwo}>事件二</Button>
                                <Button onClick={this.buttonClickThree}>事件三</Button>
                            </ButtonGroup>
                        </div>
                        <p>{this.state.buttonName}</p>
                        <p>{this.state.buttonName2}</p>
                        <p>{this.state.buttonName3}</p>
                    </fieldset>
                </section>
            </div>
            {/* <div className="e-footer">
                <footer>
                    <p className="e-text-center copyright">@ 2018 hapidog</p>
                </footer>
            </div> */}
        </div>
    }
}

render(<Home id="e-home"></Home>, containerNode);