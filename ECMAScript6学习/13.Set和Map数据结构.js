//13.1 set的创建，实例的属性和方法
//特点：添加的值不重复，判定条件为"==="严格相等；对象恒不相等
var s = new Set();
[1,3,1,4].map(a=>s.add(a));
for (i of s){console.log(i)};

var set =new Set([1,2,3,3]);
console.log(set.size);
//浏览器不支持
// function divs(){
//     return [...document.querySelectorAll('div')]
// }
// var set = new Set(divs())
// console.log(set.size);

//属性： Set.prototype.constructor Set.prototype.size
//4个操作方法
set.add("ss");
//set.has("ss")   true
set.clear();//清空
set.add("hello");
set.add("world");
set.add({a:"aa"});
set.delete("hello");

//set转化为数组
var items = new Set([1,2,3]);
var array = Array.from(items);

//利用set去除数组中重复元素
function dedupe(array){
    return Array.from(new Set(array));
}
dedupe([1,1,2,3]);
//遍历操作
for(let item of set.keys()){
    console.log(item);
}
for (let item  of set.values()){
    console.log(item);
}
for (let item of set.entries()){
    console.log(item);
}
//Set.prototype[Symbol.iterator]===Set.prototype.values
for (let item of set){
    console.log(item);
}
//扩展运算符（...)内部使用 for ... of 循环
//使用[...set]将set快捷变为数组
{
    let set =new  Set(['red','green','blue']);
    let arr=[...set];
}
//set使用filter,map方法
{
    let set = new Set([1,2,3,4,5]);
    set =new Set([...set].filter(x=>(x%2)==0));
}
//并集，交集，差集
let a= new Set([1,2,3]);
let b= new Set([4,3,2]);

let union= new Set([...a,...b]);
console.log([...union]);

let intersect = new Set([...a].filter(x=>b.has(x)));
console.log([...intersect]);

let difference = new Set([...a].filter(x=>!b.has(x)));
console.log([...difference]);
//forEach方法
union.forEach((value,key)=>console.log(value*2));
 
let set1 = new Set([1,2,3]);
set1 =new Set(Array.from(set1,val=>val*3));
console.log([...set1]);


//13.4 Map遍历方法
//values,keys,entries,forEach




