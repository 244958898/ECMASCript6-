var handler = {
    deleteProperty (tartget,key){
        invariant(key,'delete');
        return true;
    }
}
function invariant(key,action){
    if(key[0]==='_'){
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
}
var faa={_foo:'foo'};
var proxy=new Proxy(faa,handler);
delete faa._foo;//可删除，proxy._foo不可删
console.log(JSON.stringify(proxy));//测试结果表示delete正常属性操作delete proxy.foo不成功被覆盖了
//11.3  Proxy.revocable()
let target={};
let handler={};
let{proxy,revoke}=Proxy.revocable(target,handler);
proxy.foo=123; 
console.log(proxy.foo);//123
revoke();
console.log(proxy.foo);//undefined

//11.4 Reflect 概述
