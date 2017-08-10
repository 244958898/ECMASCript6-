//16 Promise对象
var promise = new Promise(function (resolve,reject){
    resolve('ok');
    setTimeout(function(){
        // throw new Error('test');
    },1000);
    
});
promise.then(function(value){console.log(value);}).catch(function(){
    console.log('error');
})
process.on('unhandleRejection',function(err,promise){
    console.log(err.stack);
});

//16.9 有用的附加方法 done()
Promise.prototype.done = function(onFullfilled,onRejected){
    this.then(onFullfilled,onRejected).catch(function(reason){
        setTimeout(()=>{throw reason},0);
    });
};

Promise.prototype.finally =function(callback){
    let p =this.constructor;
    return this.then(
        value => p.resolve(callback()).then(()=>value),
        reason => p.resolve(callback()).then(()=>{throw reason})
    );
};


