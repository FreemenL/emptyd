import  React,{ Component ,Fragment} from 'react';
import { method } from 'utils/tool';

import SearchControl from './SearchControl';
import BadeSearch from "./BadeSearch";
import ListPanel from "./ListPanel";
import { Button } from 'antd';
import { defaultEsearchConfig } from "../constant";
//less
import styles from './index.less';
//utils 
const { mergeConfig } = method;


const EsearchHoc = (pageConfig?:any)=>{
	return class extends React.Component<any,any> {
    static displayName =`EsearchHoc(BadeSearch)`
    static defaultProps = mergeConfig(defaultEsearchConfig,pageConfig&&pageConfig);
    render(){
      let renderList = true;
      let ownState = Object.keys(this.props.ownState);
      ownState.forEach((items,indexs)=>{
        if(items.endsWith("_DATALIST")&&(Object.keys(this.props.ownState[items]).length==1)){
          renderList = false
        }
      })
      return (
        <BadeSearch {...this.props} render={(state,handleEvent) => (
          <Fragment>
            <SearchControl  {...this.props} state={state} handleEvent={handleEvent}/>
            {!renderList?null:<ListPanel {...this.props} state={state} handleEvent={handleEvent}/>}
          </Fragment>
        )}/>
      );
    }
  }
}

export default{
	name:"EsearchHoc",
	component:EsearchHoc
}
