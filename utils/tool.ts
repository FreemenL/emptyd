import {catchTransArrFromObj} from './captureError';

export function transData(data){
	catchTransArrFromObj(data);
	return function(res){
		catchTransArrFromObj(res);
		let resData:any = [];
		let itemNum:number = 0;
		let cacheNum = 1;
		for(let i in res){	
			for(let d in data){
				if(res[i]===d){
					itemNum++
					if(itemNum%2==0){
						Array.prototype.push.call(resData[resData.length-1],{[i]:data[d]})
					}else{
						let num = itemNum>1?itemNum-(++cacheNum):itemNum-1;
						resData[num]=[{[i]:data[d]}];
					}
				}
			}
		}
		return resData;
	}
}
