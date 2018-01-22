import jsonp from 'jsonp'
import {apistr} from './config.js'
//将要的参数名穿进来

export function Storage(key,value){
	var name="kong_"+key;
	if(arguments.length==1)
	{
		return JSON.parse(localStorage.getItem(name));
	}
	else
	{
		
		var v=JSON.stringify(value);
		localStorage.setItem(name,v);
	}
}

export function isJSON(str) {
	console.log(str);
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export function home(name,option){
	return new Promise((resolve,reject)=>{
		let url="https://u.y.qq.com/cgi-bin/musicu.fcg?";
		var data={"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}};		
		option=Object.assign({},option,apistr);
		url+=param(option);
		url+="&data="+JSON.stringify(data);
		jsonp(url,(err,data)=>{
			if(!err)
			{
				resolve(data);
			}
			else
			{
				reject(err);
			}
		})
	})
}
//获取歌单推荐
export function Playlistrecommended(url,data,option){
	return new Promise((resolve,reject)=>{
		console.log(data);
		option=Object.assign({},apistr,option);
		url+=param(option);
		if(data!="")
		{
			url+="&data="+JSON.stringify(data);
		}
		jsonp(url,(err,data)=>{
			if(!err)
			{
				resolve(data);
			}
			else
			{
				reject(data);
			}
		})
	})
}
export function addzero(time){
	if((""+time).length<=1)
	{
		let t="0"+time;
		return "0"+time;
	}
	return time
}

function param(data){
	let url="";
	for(var i in data)
	{
		let value=data[i]!==undefined?data[i]:'';

		url+=`&${i}=${encodeURIComponent(value)}`;
	}
	return url?url.substring(1):'';
}

import {musicurl} from './config'
export function playsong(model){
	if(Object.prototype.toString.call(JSON.parse(localStorage.getItem("kong_playlist")))!="[object Array]")
	{
		Storage("playlist",[]);
	}
    if(new Date().getTime()-Storage("playin")>1000)
    {
		if(Object.prototype.toString.call(model)==="[object Array]")
		{
			Storage("playlist",model);
		}
		else{
			let arr=[];
			arr.push(model);
			Storage("playlist",arr);
		}	
		window.open(musicurl);
    }
    else
    {
        if(Storage("playlist")!="")
        {
			if(Object.prototype.toString.call(model)==="[object Array]")
			{
				let arr=Storage("playlist").concat(model);
				Storage("playlist",arr);
			}
			else
			{
				let arr=Storage("playlist");
				arr.push(model);
				Storage("playlist",arr);
			}
           
         }
        else
        {
			if(Object.prototype.toString.call(model)==="[object Array]")
			{
				Storage("playlist",model);
			}
			else
			{
				let arr=[];
				arr.push(model);
				Storage("playlist",arr);				
			}
		}
        this.$emit("musicts");
     }
}
