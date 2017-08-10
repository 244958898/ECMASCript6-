//将类数组对象（有length属性的对象；没值会定义为undefined;可遍历对象转化为数组
//只要具有 iterator 接口的数据结构都可以用Array.from()
let arraylike = {
    '0':'a',
    '1':'b',
    '2':'c',
    length:3
};
//ES6
let arr2 = Array.from(arraylike);
//ES5
var arr1= [].slice.call(arraylike);

//类似方法[...] 调用遍历器接口（Symbol.iterator)
function foo(){
    var arr= [...arguments];
}
//第二个参数类似map方法
// let spans = document.getSelectorAll('span.name');
// let names2= Array.from(spans,s=>s.textContent);
console.log(Array.from({'0':'aa',length:1})[0]);

//Array.of(1,2)===[1,2];

//7.3 copyWithin(a,b,c) 从a位置开始替换，替换内容为从b到c,b默认为0，c默认为结束
[1,2,3,4,5].copyWithin(0,3);

//7.4 
//7.5 fill(value,indexstart,stop)
//7.6 entries() keys() values() 返回遍历器对象
//7.7 includes() ES7 方法 babel转码器已经支持 返回bool值
//Array.prototype.some() 判断数组中是否有满足条件的元素
const contains = (()=>
Array.prototype.includes?
(arr,value)=>arr.includes(value)
:(arr,value)=>arr.some(e=>e===value))();

