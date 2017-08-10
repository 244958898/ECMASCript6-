//class 语法糖
function Point(x,y){
    this.x =x;
    this.y = y;
}
Point.prototype.toString = function(){
    return this.x+'___'+this.y;
}

class Point{
    constructor(x,y){
        this.x=x;
        this.y = y;
    }
    //不可枚举
    toString(){
        return this.x+'___'+this.y;
    }
}
//typeof Point ->function
//Point ===Point.prototype.constructor
Point.prototype={
    construtor(){},
    toString(){},
}
//扩展Point的原型属性
Object.assign(Point.prototype,{
    toValue(){},
    toValue(){}
});
//不可枚举  ES5写法是可枚举的
Point.keys(Point.prototype)//[]
Object.getOwnPropertyNames(Point.prototype)//['constructor','toString']

//表达式定义属性名
let methodName = 'getArea';
class Square{
    constructor(length){

    }
    [methodName](){//getArea

    }
}
//constructor方法
class Foo{
    constructor(){
        return Object.create(null);
    }
}
new Foo() instanceof Foo//false
//实例对象
var point = new Point(2,3);
point.toString();//2,3
point.hasOwnProperty(x)//true;
point.hasOwnProperty(y)//true;
point.hasOwnProperty('toString') //false 定义在Point上而不是实例上
point._proto_.hasOwnProperty('toString')//true

p1._proto_===p2._proto_;//true

p1._proto_.printName =function(){return 'name'};
p1.printName();//name
var p3=new Point(1,3);
p3.printName();//name

//name属性继承于function
class foo{}
foo.name==='foo'//true

//class表达式
const MyClass=class Me{
    getClassName(){
        return Me.name;
    }
}
let inst =new MyClass();
inst.getClassName()//Me
Me.name//ReferenceError:Me is not defined
//立即执行的Class
let person =new class{
    constructor(name){
        this.name =name;
    }
    sayName(){
        console.log(this.name);
    }
}('张三');
person.sayName();
//类和模块中默认严格模式，以后都会模块化所以ES6把整个语言升级到严格模式

//18.2 Class继承
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);//调用父类的构造函数
        this.color =color;
    }
    toString(){
        return this.color+super.toString();
    }
}
//18.3 原生构造函数的继承； ES5原生构造函数的内部属性无法获得，所以无法继承；
//ES6 先实例化构造函数对象，然后包装该对象为新的类；所以可以实现
class versionedArray extends Array{
    constructor(){
        super();
        this.history =[[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0,this.length,...this.history[this.history.length-1]);
    }
}

//18.4 class 的取值函数和存值函数
class MyClass{
    consturctor(){
        //...
    }
    get prop (){
        return 'getter';
    }
    set prop(value){
        console.log('setter' +value);
    }
}
let inst =new MyClass();
inst.prop = 123;//setter:123
inst.prop//'getter
// class的Generator函数和静态方法
class Foo{
    static classMethod(){
        return 'hello';
    }
}
class Bar extends Foo{    
}
Bar.classMethod();//'hello'
super.classMethod()//调用父类的静态方法
Bar.myProp = 44;//ES6静态属性写法

//ES7 静态属性和实例属性写法
class MyClass{
    myProp  =42;
    static myStaticProp =43;
    constructor(){
        console.log(this.myProp);
        console.log(MyClass.myStaticProp);
    }
}

//18.8 new.target属性
function Person(name){
    if (new.target !==undefined){
        this.name =name;
    }
    else{
        throw new Error('必须使用new生成实例');
    }
}
var person =new Person('chenrui');
var notAPerson = Person.call(person,'cr');//报错 new.target未定义
//class内部调用new.target,返回当前class;子类继承父类时，返回子类
//利用以上特点，可以写出自身不能使用的类，只有继承的子类可以调用

//18.9 Mixin模式的实现
function mix(...mixins){
class Mix{}
for(let mixin of mixins){
    copyProperties(Mix,mixin);
    copyProperties(Mix.prototype,mixin.prototype);
}
return Mix;
}
function copyProperties(target,source){
    for(let key of Reflect.ownKeys(source)){
        if(key !=='constructor'&& key !=='prototype'&&key!=='name'){
            let desc = Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperty(target,key.desc);
        }
    }
}
class DistributedEdit extends mix(class1,class2){//继承 mix函数混入之后的类即可

}