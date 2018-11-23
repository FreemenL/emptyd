import React,{ Component }from 'react';
import { Row, Col } from 'antd'; 
import { tool } from '../utils/utils';
import styles from './index.less';

const { transData } = tool;
function EListHoc(data,Effect?:any){
	if(_.isEmpty(data)){
		return ({params})=>(<Effect/>)
	}
	return function Detail({params}){
		const currentData = transData(params)(data);
		return(
			<section  className={styles["empty-detail-wrapper"]}>
				<Row gutter={24} >
		          {currentData.map((item,index)=>{
		          	return(
		          		<Col key={`${index}detail-map`} xxl={16} xl={22} lg={24} md={24} sm={24} xs={24} className={styles["empty-detail-wrapper-row"]}>
		      	          	{item.map((items,indexs)=>{
		      	          		return(
			      	          		<div key={`${indexs}`}>
				      	          		<span>{Object.keys(items)[0]}</span>
				      	          		<span>{Object.values(items)[0]}</span>
				      	          	</div>
		      	          		)
		      	          	})}
	      	          </Col>
		          	)
		          })}
		        </Row>
		        {Effect&&<Effect params={params}/>}
			</section>
		)
	}
}

export default{
	name:"EListHoc",
	component:EListHoc
}
