/*
	1.4.14
*/
var express=require('express');
var app=express();
var axios=require('axios');
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '123456',
// 	database : 'mygdmap'
// });
// connection.connect();

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

app.use(express.static('./public'));

app.get('/v3/log/init', function(req, res) {
	if(req.query.callback){
		res.send(req.query.callback +'({"status":"1","info":"OK","infocode":"10000","version":"4.0.1"})')
	} else {
		res.end()
	}
})
app.get('/count', function(req, res) {
	if(req.query.cbk){
		res.send('\n\n'+ req.query.cbk +'&&'+ req.query.cbk +'({});')
	} else {
		res.end()
	}
})

app.get('/maps/cookie', function(req, res) {
	res.send({"code":0})
})

app.get('/getcommonwords', function(req, res) {
	res.send({"code":1,"ver":"1.0.0","data":{"range":["32-23646","23648-28465","28478-34966","34972-39539"],"urlPrefix":"/public/images/assets/"}})
})

app.get('/v3/direction/driving', function(req, res) {
	res.end()
	// axios({
	// 	url: 'http://restapi.amap.com/v3/direction/driving',
	// 	params: req.query
	// }).then(function(response){
	// 	res.send(response.data)
	// })
})

app.get('/v3/place/text', function(req, res) {
	res.end()
	// axios({
	// 	url: 'http://restapi.amap.com/v3/place/text',
	// 	params: req.query
	// }).then(function(response){
	// 	res.send(response.data)
	// })
})

app.get('/v3/config/district', function(req, res) {
	res.end()
	// axios({
	// 	url: 'https://restapi.amap.com/v3/config/district',
	// 	params: req.query
	// }).then(function(response){
	// 	res.send(response.data)
	// })
})

app.get('/maps', function(req, res) {
	var jsList = req.query.plugin || ''
	axios.get('http://localhost:8888/main.js').then(function(item){
		var msg = '(function(config){'+ item.data +'})(["2d5b9876e9b0a4a522ced74a580450c9",[111.896257,27.848072,114.261265,28.661612,112.982279,28.19409],"http://localhost:8888",1,"1.4.14",null,"430100","'+ jsList +'",true,false,true,true,"1559049388-1",false])'
		res.send(msg)
	})
})

app.get('/style',function(req, res) {
	var mapStyle = req.query.name || 'normal'
	axios.get('http://localhost:8888/load/mapStyle-'+ mapStyle +'.txt').then(function(item){
		res.set({
			'Content-Type': 'application/javascript; charset=utf-8'
		})
		res.send(req.query.callback ? req.query.callback +'&&'+ req.query.callback +'('+ item.data +')' : item.data)
	})
})

app.get('/maps/modules',function(req, res) {
	var jsList = req.query.m.split(',')
	var arr = jsList.map(function(item){
		return axios.get('http://localhost:8888/load/'+ item +'.txt')
	})

	axios.all(arr).then(function(a){
		var str = ''
		;[].forEach.call(a, item => {
			str += item.data +'\r\n'
		})
		res.set({
			'Content-Type': 'application/javascript; charset=utf-8'
		})
		res.send(str)
	})
})

var dfMap = 'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX8+fL///+uwqq/AAAAAWJLR0QB/wIt3gAAAB9JREFUaN7twQENAAAAwqD3T20ON6AAAAAAAAAAAL4NIQAAAX8ZnKcAAAAASUVORK5CYII='
var binaryDfData = new Buffer(dfMap, 'base64')

app.get('/appmaptile',function(req, res) {
	// axios({
	// 	url: 'http://wprd01.is.autonavi.com/appmaptile',
	// 	params: req.query,
	// 	responseType:'blob',
	// 	headers: {
	// 		'Content-Type': 'image/png'
	// 	},
	// }).then(function(response){
	// 	// console.log(res)
	// })
	
	res.send(binaryDfData)
})

app.get('/limg',function(req, res) {
	var list = req.query.t.split(';')
	var arr = '{"x-vd-v":"v5","tv":"1540301191","vdv":"1","bgc":"fffcf9f2","grid":24}|'

	// var h = ''
	// for(var i = 0, len = list.length; i < len; i++) {
	// 	if(i === 0){
	// 		h += '"'+ list[i] +'"'
	// 	} else {
	// 		h += ', "'+ list[i] +'"'
	// 	}
	// }
	// connection.query('Select limg,roadlabel,poilabel,mapkey From limgtiles Where mykey in ('+ h +')', function (err, result) {
	// 	result.forEach(function(item){

	// 		arr += p1(item, 'limg') +'|'
	// 		arr += p1(item, 'roadlabel') +'|'
	// 		arr += p1(item, 'poilabel') +'|'

	// 	})
	// 	res.send(arr)
	// })
	// return
	axios({
		url: 'https://vdata.amap.com/limg',
		params: req.query
	}).then(function(response){
		res.send(response.data)
	})
})

function mE(a, b, c) {
    var d, e;
    d = Math.floor(c / 2);
    e = c - d;
    d = (1 << d) - 1 << e;
    e = (1 << e) - 1;
    return [c, a & d | b & e, b & d | a & e]
}


app.get('/tiles',function(req, res) {
	var list = req.query.t.split(';')
	var arr = '{"x-vd-v":"v5","tc":'+ list.length +',"tv":"1540301191","vdv":"1","mapType":"normal","bgc":"fffcf9f2","grid":24}|'
	var h = ''
	
	
	// var region = '',
	// 	road = '';	
	// for(var i = 0, len = list.length; i < len; i++) {
	// 	var aaa = list[i].split(',')
	// 	region += '["'+ mE(aaa[1], aaa[2], aaa[0]).join('-') +'-region"]' +'|'
	// 	road += '["'+ mE(aaa[1], aaa[2], aaa[0]).join('-') +'-road"]' +'|'
	// }
	// arr += region + road
	// res.send(arr)
	// return



	// for(var i = 0, len = list.length; i < len; i++) {
	// 	if(i === 0){
	// 		h += '"'+ list[i] +'"'
	// 	} else {
	// 		h += ', "'+ list[i] +'"'
	// 	}

	// 	var aaa = list[i].split(',')
	// 	region += '["'+ mE(aaa[1], aaa[2], aaa[0]).join('-') +'-region"]' +'|'
	// 	road += '["'+ mE(aaa[1], aaa[2], aaa[0]).join('-') +'-road"]' +'|'
	// }
	// var region = '',
	// 	building = '',
	// 	road = '';
	// connection.query('Select '+ req.query.flds +',mapkey From limgtiles Where mykey in ('+ h +')', function (err, result) {

	// 	console.log(result)
	// 	result.forEach(function(item){
	// 		if(item.region) region += p1(item, 'region') +'|'
	// 		if(item.building) building += p1(item, 'building') +'|'
	// 		if(item.road) road += p1(item, 'road') +'|'
	// 	})
	// 	arr += region + building + road
	// 	res.send(arr)
	// })
	// return
	axios({
		url: 'https://vdata.amap.com/tiles',
		params: req.query
	}).then(function(response){
		res.send(response.data)
	})
})

function p1(item, key){
	if(key == 'region' && item[key] == 'water'){
		item[key] = '[[["RQRQRQfgfgfgfgRQ"],null,10,"water","30001:6"]]'
	}
	if(item[key].length > 2){
		return item[key].replace(/(.{1})/, '["'+ item.mapkey +'-'+ key +'",')
	} else {
		return item[key].replace(/(.{1})/, '["'+ item.mapkey +'-'+ key +'"')
	}
}

app.listen(8888, function () {
	
});
