import React,{Component}from 'react';
import { Form } from 'antd';
import freetool from 'freetool';
import autobind from 'autobind-decorator';

import { emptyFormConfig } from '../constant';
import EwapperHoc from '../EwapperHoc';
import Eform from '../Eform/index';

const { mergeConfig } = freetool;

function EformHoc(this:any,EformConfig,pattern){
	const that = this;
	let defaultProps = mergeConfig(emptyFormConfig.call(this),(EformConfig&&pattern=="edit")?EformConfig.call(this):(EformConfig&&EformConfig(pattern)));
	@autobind
	class  EFormWrapper extends Component<any>{
		static displayName = "EformHoc(EFormWrapper)"
		static defaultProps = defaultProps
		constructor(props){
			super(props)
			this.Eform = Eform.bind(this);
			this.Ewapper = EwapperHoc({Rowlayout:this.props.Rowlayout})
		}
		Eform
		Ewapper
		getElement(){
		    const SearchItem = this.Eform
		    return this.props.searchPanel?(<SearchItem/>):null;
		}
		handleSearch(e){
		   if(!this.props.searchPanel.submit){throw ReferenceError("EformHoc params must be have submit props！")}
		   this.props.searchPanel.submit.call(this,e,that.props);
		}
		handleReset(){
		   this.props.form.resetFields();
		}
		render(){		
	        return(
        		<this.Ewapper>
        		   {this.getElement()}
        		</this.Ewapper>
	        )
		}
	}
	return Form.create()(EFormWrapper)
}

export default EformHoc;
































