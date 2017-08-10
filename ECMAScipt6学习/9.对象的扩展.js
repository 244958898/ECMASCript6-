//9.1 属性简洁表示
var foo='bar';
var bar={foo};//{foo:'bar'};

//方法简洁表示
var o ={
    method (){
        return 'hello';
    }
};
//属性名表达式
let propkey = 'foo';
let obj2={
    [propkey]:true,
    ['a'+'bc']:123
};

//属性名表达式和属性名简洁写法不能同时使用否则报错
//var foo='bar';
//var bar = 'abc';
// var baz = {[foo]};

//9.3 方法name属性
var obj= {
    sayHello (){
        return 'hello';
    },
    get getHello (){
        return 'hello';
    }
};
obj.sayHello.name==='sayHello';
obj.getHello.name==='get getHello';

const key1 = Symbol('description');
const key2 = Symbol();
let object = {
    [key1] (){},
    [key2] (){},
};
object[key1].name//"[description"
object[key2].name//""

//9.4 Object.is() 比较两个值是否严格相等 基本等于===
Object.is('foo','foo');//true
Object.is({},{});//false

//ES5 部署Object.is
Object.defineProperty(Object,'is',{
    value:function(x,y){
        if(x===y) {
            return x!==0||1/x === 1/y;
        }
        return x!==x&&y!==y;
    },
    enumerable:false,
    configurable:true,
    writable:true
})

//Object.assign()  将源对象放入目标对象，后者覆盖前者同名属性；
//只复制自身属性，继承和不可枚举属性不复制
var target ={a:1};
var source1 = {b:2,c:2};
var source2 = {b:3,c:3};
Object.assign(target,source1,source2);//target ={a:1,b:3,c:3};

//可用于处理数组，将数组视为对象，以索引作为键
Object.assign([1,2,3],[4,5]);//[4,5,3]
//为对象添加属性
class point {
    constuctor(x,y){
        Object.assign(this,{x,y});
    }
}
//为对象添加方法
// Object.assign(SomeClass.prototype,{
//     someMethod(){
//         return ture;
//     },
//     anotherMethod (x,y){
//         return {x,y};
//     }
// });
//克隆对象,自身值） 继承值不会复制
function clone(origin){
    return Object.assign({},origin);
}
function clone1(origin){
    let proto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(proto),origin);
}
//合并对象
const merge =(...sources)=>Object.assign({},...sources);
//为属性指定默认值
var DEFAULTS={
    loglevel:0,
    outputFormat:'html'
};
//1.会报错 2.不懂描述说 ： 不能指向另一个对象，应该为简单值
function t(options){
    console.log(Object.assign({},DEFAULTS));
    return  Object.assign({},DEFAULTS,options);
}
t();

// 属性的可枚举性
var objects={foo:123};
Object.getOwnPropertyDescriptor(objects,'foo');
//{enumberable:false,value:123...}
// ES5忽略不可枚举属性的操作
//for in 自身加继承--可枚举; Object.keys() ; JSON.stringify(); 自身可枚举 ;故最好不要用for in 循环而是用Object.keys()遍历
//ES6 Object.assign(); Reflect.enumberate();

//9.8 __proto__  ES6写法
// var obj ={
//     method:function(){...};
// }
// obj.__proto__ =someOtherObj;
//ES5  someOtherObj 为该对象指定的原型对象？
// var obj =Object.create(someOtherObj);
// obj.method = function(){};

//Object.getPrototypeOf(obj); === return obj.__proto;
//Object.setPrototypeOf(obj,proto); === obj.__proto__ =proto;

//9.9 对象扩展运算符 ES7提案 babel转码器已实现
let {x,y,...z}={x:1,y:2,a:3,b:4};
// x 1 y 2 z=>{a:3,b:4}

//浅复制；1.对象的引用而非其值 2.原型对象不会复制

//扩展运算符
// let z={a:3,b:4};
// let zclone={...z};
// let a={a:3};
// let b={b:3};
// let aclone={...a,...b};  === Object.assign({},a,b)

// let runtimeError={
//     ...{
//         get x(){
//             console.log('a');
//             //throws new Error('thrown now');
//         }
//     }
// };
//会执行函数抛出报错，因为扩展运算符操作get函数参数会执行里面的函数；测试未成功

