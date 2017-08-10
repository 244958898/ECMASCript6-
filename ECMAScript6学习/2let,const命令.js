    //1.let 块级作用域有效
    {
		var a=9;
		let b=9;
	}
    //console.log(b);
    console.log(a);
    
    //2.特性
    var b=[];
    for(let i=0;i<10;i++){
        b[i]=function(){
            console.log(i);
        }
    }
    b[2]();
    var a=[];
    for(var j=0;j<7;j++){
        //var q=j;
        a[j]=function(){
            console.log(j);
        }
    }
    a[3]();

    //3.没有声明提前，var相当于先声明 ，然后log然后赋值；
    console.log(foo);
    var foo=0;

    //console.log(log); 会报错 这里是先Log再声明及赋值
    let log=9;

    //4.死区
    var x;
    {
        x=9;
        //let x; ReferenceError;
    }
    
    function bar(x=9,y=x){
        console.log(x,y);
    }
    bar();
    
    //IIFE不再必要，通过let的块级作用域实现
    (function(){
        var temp=0;
    }());

    {
        let temp =0;
    }

    //块级作用域外部无法调用内部函数，可通过如下方式实现，调用f()且不以“；”结尾
    //严格模式下，会报错；代码块内声明函数
    let f;
    {
        let a="secret";
        f=function(){
            console.log(a);
        }
    }
    f()
    
    //内部引用外部，反之不行
    {let a=0;{console.log(a)}}

    //2.3 const常量
    //冻结对象，并设为常量对象
    const foo = Object.freeze({});
    //冻结对象属性及对象；彻底冻结传入对象的函数
    var constantize =(obj)=>{
        Object.freeze(obj);
        Object.keys(obj).forEach((key,value)=>{
            if(typeof obj[key]==='object'){
                constantize(obj[key]);
            }
        });
    };

    //2.4 跨模块常量
    //2.5全局对象属性
    var a=1;//window.a
    let b=0;//window.b未定义undefined

    