//类的修饰 ES7提案 Babel转码器支持
function testable(target){
    target.isTestable = true;
}
@testable
class MyTestableClass{}
//修饰器对类行为的修改发生在编译阶段
@decorator
class A{}
//等同于
class A{}
A = decorator(A) ||A;

function testable(isTestable){
    return function(target){
        target.isTestable =isTestable;
    }
}
@testable(true)
class MyClass{
}
MyClass.isTestable ===true;

//方法的修饰
class Person{
    @readonly
    name(){
        return `${this.first}${this.last}`;
    }
}
//等同于
readonly(Person.prototype,'name',descriptor);
function readonly(target,name,descriptor){
    descriptor.writable = false;
    return descriptor;
}
Object.defineProperty(Person.prototype,'name',descriptor);

//19.4 core-decorators.js
import{autobind} from 'core-decorators';
class Person{
    @autobind
    getPerson(){
        return this;
    }
}
let person = new Person();
let getPerson =person.getPerson;
getPerson() === person//true

//@readonly 只读； override正确覆盖父类方法； @deprecate 提示该方法将废除； @suppressWarnings 抑制修饰器导致的console.warn()调用，异步代码发出的调用除外；
//19.5 使用修饰器实现自动发布事件
//19.6 mixins 和 Traits第三方模块修饰器
//7 Babel转码器转码Decorator修饰器使用方法

