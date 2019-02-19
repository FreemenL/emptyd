import React,{ Component }from 'react';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

interface Props{
	children:any,
	style?:object,
	[propName: string]: any
}

class Etext extends Component<Props,object>{
	constructor(props){
		super(props);
	}
	render(){
		const { style,...reset } = this.props;
		return(
			<div className="texty-demo" style={ style }>
		    <Texty {...reset} >
		    	{this.props.children}
		    </Texty>
		  </div>
		)
	}
}

export default Etext;
