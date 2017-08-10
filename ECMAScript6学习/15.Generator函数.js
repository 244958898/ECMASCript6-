//15.3 for...of 循环
function*foo(){
    yield 1;
    yield 2;
    return 3;
}
for(let v of foo()){
    console.log(v);
}

//通过Generator函数和for ... of 循环实现斐波那契数列
function * fibonacci(){
    let [prev,curr] = [0,1];
    for (;;){
        [prev,curr] = [curr,prev+curr];
        yield curr;
    }
}
for(let n of fibonacci()){
    if(n>20) break;
    console.log(n);
}

function * test(){
    yield 1;
    yield 2;
    return 3;
}
//遍历的几种用法
let [x,y]=test();//x=>1 y=>2
Array.from(test());//[1,2]
[...test()];//[1,2]
for(let n of test()){
    console.log(n);
}
//利用 for...of和Generator函数遍历对象
function* objectEntries(obj){
    let propKeys = Reflect.ownKeys(obj);
    for (let prop of propKeys){
        yield [prop,obj[prop]];
    }
}
let jane ={first:'jane',second:'cherry'};
for(let [key,value] of objectEntries(jane)){
    console.log(`${key}:${value}`);
}
//15.4 Generator.prototype.throw()

//15.5 Generator.prototype.return()

function *gen(){
    yield 1;
    yield 2;
    try{
        yield 3;
    }
    finally{
        yield 4;
    }
}
var g=gen();
g.next();//1
g.next();//2
g.return(6);//4
g.next();//6

//15.6 yield *语句
//Generator函数调用Generator函数，默认不生效
//15.7 二叉树
function Tree(left,label,right){
    this.left = left;
    this.label = label;
    this.right = right;
}

function *inorderTree (tree){
    if(tree){
        yield *inorderTree(tree.left);
        yield tree.label;
        yield *inorderTree(tree.right);       
    }
}
function maker(array){
    if(array.length==1) return new Tree(null,array[0],null);
    return new Tree(maker(array[0]),array[1],maker(array[2]));
}
let tree =maker([[['a'],'b',['c']],'d',[['e'],'f',['g']]]);
var result=[];
for (let node of inorderTree(tree)){
    result.push(node);
    console.log(node);
}

//15.8 this 函数可看成特殊的构造函数 
//返回的遍历器为Generator函数的实例
function * F(){
    yield this.x = 2;
    yield this.y = 3;
}
var obj ={};
var f=F.bind(obj)();
f.next();
//obj.x ==2;
//15.9 函数推导=》ES7
let generator =function *(){
    for(let i=0;i<6;i++){
        yield i;
    }
}
//let squard =(for (n of generator()) n*n); ES7写法

//15.10 含义1 状态机
var clock =function*(){
    while(true){
        yield _;
        console.log('Tick');
        yield _;
        console.log('Tock');
    }
};
//含义2 协程


