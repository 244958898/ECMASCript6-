class MyClass{
    [Symbol.hasInstance](foo){
       // return foo instanceof Array;
    }
}
var o= new MyClass();
var q=[1,3];
console.log(o instanceof MyClass);
console.log(MyClass[Symbol.hasInstance](q));
console.log([1,2,3] instanceof new MyClass);

var handler ={
    get:function(target,name){
        return 'hello';
    }
};
var proxy=new Proxy(function(x,y){
    return x+y;
},handler);
console.log(proxy.time);
var b;
console.log(b=3);

