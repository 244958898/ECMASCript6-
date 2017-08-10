//Es6之前 异步编程方法 有4种 ：1.回调函数 2.事件监听 3、发布、订阅 4.Promise对象

// //THunk函数 多参数版本转化为单参数版本（含回调函数）
// fs.readFile(filename,callback);
// //单参数版本
// var readFileThunk = Thunk(fileName);
// readFileThunk(callback);
// var Thunk =function(filename){
//     return function(callback){
//         fs.readFile(filename,callback);
//     }
// };

//Thunk函数转换器
// var Thunk = function(fn){
//     return function(){
//         var args = Array.prototype.slice.call(arguemtns);
//         return function(callback){
//             args.push(callback);
//             return fn.apply(this,args);
//         }
//     }
// };
//调用Thunk函数转换器
// var readFileThunk = Thunk(fs.readFile);
// readFileThunk(fielA)(callback);

//生产环境下，使用Thunkify模块  其源码类似之前定义的转换器，只是增加了回调函数的确保运行一次的机制
// var thunkify = require('Thunkify');
// var fs = require('fs');
// var read = thunkify(fs.readFile);
// read('read.json')(function(err,data){});

//应用 Generator函数的流程管理
var thunkify = require('Thunkify');
var fs = require('fs');
var read = thunkify(fs.readFile);
var gen =function*(){
    var r1 = yield read('a.json');
    console.log(r1.toString());
    var r2 =yield read('b.json');
    console.log(r2.toString());
};
//手动执行Generator函数
var g =gen();
var r1=g.next();
r1.value.then(function(err,data){
    if(err) throw err;
    var r2 = g.next(data);
    r2.value.then(function(err,data){
        if(err) throw err;
        g.next(data);
    });
});
//Thunk函数的自动流程管理
//基于Thunk函数的Generator生成器
function run(fn){
    var gen =fn();
    function next(err,data){
        var result =gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}
run(gen);

//17.4 co模块
function co(gen){
    var ctx = this;
    return new Promise(function(resolve,reject){
        if(typeof gen ==='function') gen = gen.call(ctx);
        if(!gen||typeof gen.next!=='function') return resolve(gen);

        onFulfilled();
        function onFullfilled(res){
            var ret;
            try{
                ret = gen.next(res);
            }
            catch (e){
                return reject(e);
            }
            next(ret);
        }
        function next(ret){
            if(ret.done) return resolve(ret.value);
            var value =  toPromise.call(ctx,ret.value);
            if(value && isPromise(value)) return value.then(onFullfilled,onRejected);
            return onRejected(new TypeError('You may onlu yield a function,promise,generator,array,or object'));

        }
    });
}

//17.5 ES7 async函数
var fs = require('fs');

var readFile= function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
};

var gen =function*(){
    var y1 =yield readFile('a.json');
    var y2 = yield readFile('b.json');
    console.log(y1.toString());
    console.log(y2.toString());
}

//async函数自带执行器写法
var asyncReadFile =async function(){
    var f1 =await readFile('a.json');
    var f2 =await readFile('b.json');

}
//依次执行异步操作
async function dbFunc(db){
    let docs = [{},{},{}];
    for(let doc of docs){
        await db.post(doc);
    }
}
//并发执行
async function dbFunc2(db){
    let docs=[{},{},{}];
    let promises = docs.map(function(doc){return db.post(doc)});
    await Promise.all(promises);
}
//方法2
async function dbFunc3(db){
    let docs=[{},{},{}];
    var results=[];
    let promises = docs.map(doc=>db.post(doc));
    for(let promise of promises){
        results.push(await promise);
    }
}
