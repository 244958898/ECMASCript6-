//设置参数默认值，若y对应的bool值为false则赋值不起作用 如 y="" 
function log1(x,y){
    y=y||'world';
    console.log(x,y);
}
//解决方法
// if(typeof y === 'undefined'){
//     y='world';
// }
// if(arguments.length===1){
//     y='world';
// }

//ES6 实现参数默认值设置
function log(x,y=9){
    console.log(x,y);
}
log(2);//2 9
//结合解构赋值的默认值和函数参数默认值
function m1({x=0,y=0}={}){
    console.log(x,y);
}
function m2({x,y}={x:0,y:0}){
    console.log(x,y);
}
m1();//0 0
m2();//0 0
m1({x:3});//3 0
m2({x:3});//3 undefined
m1({});
m2({});

//函数参数默认值一般设置在参数末位
//否则无法略去，可用undefined代替,null不行
function f(x,y=3,z){
    console.log(x,y,z);
}
f(2,undefined,4);//2 3 4

//函数的length属性返回未设置默认值的参数个数
console.log((function(a){}).length);//1
console.log((function(a=1){}).length);//0

//rest参数也不会计入length属性
console.log((function(...args){}).length);//0

//函数参数若用 变量 作为默认值 ，其作用域和其他参数一样，显示函数作用域然后是全局作用域
var x=1;
function f(x,y=x){
    console.log(x,y);
}
f(3);//3 3

let z=1;
function p2(y=z){
    let z=2;
    console.log(y);
}
p2(); //1 若未定义全局变量z会报错


//如果默认值是函数，作用域为全局作用域；
//因为 匿名函数其实是在外部创建的
let foo ='outer';
function p(func= ()=>foo){
    let foo='inner';
    console.log(func());
};
p();//outer

var f= v=> v+'b';
console.log(f('a')); //ab

//8.2rest参数 用于不定参数个数的函数定义
function add(...values){
    let sum=0;
    for(var val of values){
        sum+=val;
    }
    return sum;
}
add(2,2,4);//8

//items为rest中的变量代表一个数组，故该变量可使用数组所有方法
function push(array,...items){
    items.forEach(function(item){
        array.push(item);
        console.log(item);
    });
}
var a=[];
push(a,1,2,3);//a=[1,2,3];

//rest参数后不能再有其他参数，否则报错；length属性不包括rest参数

//8.3 扩展运算符
console.log(...[1,2,3]);
//好比rest参数逆运算，将数组转为参数序列；

//第一个将参数转为items数组变量
//第二个将数组用...操作为（item[0],item[1]...);
function push(array,...items){
    array.push(...items);
}

//ES5中函数调用数组中的参数 的方法
function f(x,y,z){};
var arry=[1,2,3];
f.apply(null,arry);

//ES6 使用rest参数的写法
f(...arry);//123

//Es5 将数组添加到另一个数组尾部
var arr1=[1,2,3];
var arr2=[2,3,4];
Array.prototype.push.apply(arr1,arr2);
arr1.push(...arr2);

[1,2,...arr2];
//函数name属性
console.log( (function(){}).bind({}).name);//bound

function f(){
    console.log(arguments);
};
f(1,2);//[1,2]?
