import { captureError} from './utils/utils';
const {loadComponentError} = captureError;

let components:any = {};
const componentsItem = require.context('./',true,/index\.tsx$/);
componentsItem.keys().find((item,index,array)=>{
	let modules;
	try{
		modules = componentsItem(item).default;
	}catch(err){
		throw new Error(`${item}:${err}`);
	}
	if(modules&&modules.name&&modules.component){
      components[modules.name] = modules.component;
      return false;
    }
    loadComponentError(modules,item);
})

export default components;