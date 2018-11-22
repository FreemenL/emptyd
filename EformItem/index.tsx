import React,{ Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option


function getSelect(params?:any){

  return class extends Component<any,any>{
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value){
      this.props.onChange(value)
    }
    render(){
      const initialValue = this.props['data-__meta']["rules"][0]["initialValue"];
      const values = this.props.value;
      return(
        <Select onChange={this.handleChange} value={values||initialValue}>
          <Option value={1}>内勤班次</Option>
          <Option value={2}>外勤班次</Option>
        </Select>
      )
    }
  }
}


export default{
	name:"EFormItem",
	component:{
		getSelect
	}
}

