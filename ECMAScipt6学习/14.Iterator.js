//集合数据类型由object+Array增加至set和map，需要一种统一接口机制处理不同数据结构--Iterator遍历器
//作用1：提供统一访问接口；2.使得数据结构的成员能按某种次序排列；3.创造新的遍历指令---for...of循环，Iterator供其消费；
//14.2 数据结构默认Iterator接口 --数组，类数组，set+map
function Obj(value){
    this.value= value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){
    var iterator ={
        next:next
    };
    var current = this;

    function next(){
        if(current){
            var value = current.value;
            var done = current ==null;
            current = current.next;
            return{
                done:done,
                value:value
            }
        }
        else{
            return {
                done:true
            }
        }
    }
    return iterator;
}
var one =new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next =two;
two.next = three;

for(var i of one){
    console.log(i);
}
//14.3调用接口场合--解构赋值；扩展运算符...;yield*;其他场合
//14.4 字符串iterator接口 类似数组；原生具有接口
var string = 'hello';
var iterator = string[Symbol.iterator]();//调用遍历器接口，返回遍历器对象；该遍历器对象具有next方法返回value+done属性
console.log(iterator.next());
console.log(iterator.next());

string[Symbol.iterator]=function(){
    return{
        next:function(){
            if(this._first){
                this._first = false;
                return {value:'bye',done:false};
                console.log('aa');
            }
            else{
                return{done:true};
            }
        },
        _first:true
    };
};
for(var i of string){
    console.log(i);
}
console.log([...string]);//咋和书上说的结果不一样，还是原字符串的遍历？

//14.5 运用Generator函数实现Iterator接口
var myIterable = {};
myIterable[Symbol.iterator] = function *(){
    yield 1;
    yield 2;
};
//方法二
let obj={
    *[Symbol.iterator](){
        yield 'hello';
        yield 'world';
    }
};
//14.7 遍历器对象iterator的return() throw()
function readLinesSync(file){
    return {
        next(){
            if(file.isAtEndOfFile()){
                file.close();
                return {done:true};
            }
        },
        return(){//必须返回一个对象
            file.close();
            return {done:true};
        }
    }
}
// for(let line of readLinesSync(filename)){
//     console.log('x');
//     break;//触发return()方法
// }

//数组的for of调用遍历器对象 只返回数字索引的属性 for in 都返回；map不是具有非数字索引吗。。。（可能map是它自身的iterator对象
let arr =[1,2];
arr.foo ='foo';
for(var i in arr){//for in 输出数组的property
    i ===1||2||'foo';
}
console.log(arr instanceof Array);//true

console.log(JSON.stringify(arr));//[1,2]



