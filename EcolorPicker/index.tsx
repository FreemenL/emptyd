import React, { Component } from "react";
import { Input } from "antd";
import { SketchPicker } from "react-color";
import styles from "./index.less";

interface Props {
  width?: string;
  pickerWidth:number,
  cursor:string,
  defaultValue:string,
  showValue:boolean,
  animation:string,
  handleChange: Function;
}

class EcolorPicker extends Component<Props, any> {

  static defaultProps = {
    width: "200px",
    pickerWidth:220,
    cursor:"crosshair",
    defaultValue:"#ddd",
    showValue:true,
    animation:"flipInY"
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  state = {
    //是否显示颜色选择器
    showPicker: "hide",
    //颜色值
    values:this.props.defaultValue
  }

  componentDidMount() {
    document.addEventListener("click", this.handleEvent, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleEvent, false);
  }
  //显示颜色框
  showPicker(event) {
    event.nativeEvent.stopImmediatePropagation();
    this.handleState("hide", "show");
  }
  //状态控制函数
  handleState(prev, next) {
    this.setState((prevState, props) => {
      if (prevState.showPicker == prev) {
        return {
          showPicker: next
        };
      }
      return null;
    });
  }

  handleEvent(event: any) {
    this.handleState("show", "hide");
  }
  
  handleChange(color, event){
    this.setState((prevState,props)=>({
      values:color.hex
    }),this.props.handleChange(color, event))  
  }

  render() {
    const { width, defaultValue ,pickerWidth ,cursor, showValue ,animation} = this.props;
    const colorPanel = (
      <div
        className={styles["picker-wrapper"]}
        onClick={this.showPicker}
        style={{ background: this.state.values,width:showValue?"100%":parseInt(width)/2,padding:showValue?0:"5px"}}
      > 
      <section style={{cursor}}>
        <SketchPicker
            width={pickerWidth}
            color={this.state.values}
            onChange={this.handleChange}
            className={`
              animated
              ${styles["empty-color-picker"]}
              ${styles[this.state.showPicker]}
              ${ animation }
            `}
          />
      </section>
      </div>
    )
    return (
      <span className={styles["empty-color"]}>
        {showValue?<Input
            style = {{ minWidth: "220px", width}}
            placeholder="点击左侧选择"
            disabled
            value = {this.state.values==defaultValue?"点击左侧选择":this.state.values}
            addonBefore = {
              colorPanel
            }
        />: <span className={styles['empty-color-wrapper']}>{colorPanel}</span>}
      </span>      
    );
  }
}

export default  EcolorPicker;
