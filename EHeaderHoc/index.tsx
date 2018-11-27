import React,{ Component } from 'react';
import { Layout, Menu } from 'antd';




import EText from '../EText';
import styles from './index.less';
import EMenu from '../EMenu';
import { transformMemuList } from '../utils/tool';

const { SubMenu } = Menu;
const { Header } = Layout;


const EmptyPageHeader = styles["empty-page-header"];
const EmptyPageHeaderLogo = styles["empty-page-header-logo"];
const EmptyPageHeaderTitle = styles["empty-page-header-title"];
const EmptyPageHeaderMenu = styles["empty-page-header-menu"];


interface headerConfig{
	LogoSrc:string,//logo图片地址
	name:string,//系统名称
	menuList:Array<any> //菜单数组
}

function EheaderHoc(headerConfig:headerConfig){
return class Eheader extends Component{
	constructor(props){
		super(props);
	}
	render(){
		   	transformMemuList.func(headerConfig.menuList);
			return(
			    <Header className={ EmptyPageHeader }>
			     <span className={ EmptyPageHeaderTitle }>
					<img  src={ headerConfig.LogoSrc} alt="logo" width={62} height={50} className={EmptyPageHeaderLogo}/>
					<EText.component>{headerConfig.name||"empty"}</EText.component>
				 </span>
			      <ul className={EmptyPageHeaderMenu}>
			      	{headerConfig.menuList.map((menu,index)=>{
			      		return(<EMenu.component to={transformMemuList.resData[index]} key={index}>{menu.title}</EMenu.component>)
			      	})}
			      </ul>
			    </Header>
			)
		}
	}
}

export default{
	name:"EheaderHoc",
	component:EheaderHoc
}

