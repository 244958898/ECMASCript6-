function* fibs(){
	var a=0;
	var b=1;
	while(true){
		yield a;
		[a,b]=[b,a+b];
	}
}
var [first,second,third,fourth,fifth,sixth]=fibs();
console.log(first,second,third,fourth,fifth,sixth);

var {foo,bar}={foo:"aaaa",bar:"bbbb"};
var {baz} = {foo:"aaaa",bar:"bbbb"};//undefined

let {toString :s}=true;
var a=true;
console.log(([1,2]+[3,4]));

//函数解构赋值
//为x和y设置默认值
function move({x=0,y=0}={}){
	return [x,y];
}
//为参数设置默认值
function move1({x,y}={x:0,y:0}){
	return [x,y];
}

//3.6圆括号问题
//3.7用途
//a.交换变量值
//[x,y]=[y,x];

//b.函数返回多个值
function example(){
	return [1,2,3];
}
var [a,b,c] = example();

//c.函数参数定义
function f({x,y,z}){}
f({z:3,y:2,x:1})

//d.提取JSON数据
//e.函数参数的默认值
//f.Map结构
var map =new Map();
map.set('first',"hello");
map.set('second','world');

for(let [key,value] of map){
	console.log(key+" is "+value);
}
//g.输入模块的制定方法
const {SourceMapConsumer,SourceNode} = require("source-map");



