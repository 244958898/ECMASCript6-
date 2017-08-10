//1.概述
//2. ArrayBuffer
var buffer = new ArrayBuffer(32);//32字节，1字节8位；新建32字节的内存空间，设为0；
var view =new DataView(buffer);//通过复杂视图进行读写操作
//方法+属性
buffer.length === 32;
buffer.slice(0,3).length===2;//开辟新的内存空间，然后复制原数组部分
//ArrayBuffer方法
ArrayBuffer.isView(buffer)===false;
ArrayBuffer.isView(view)===true;
//12.2 TypedArray 视图:9种类型 Int8Array UInt8Array UInt8ClampedArray Int16Array UInt16Array Int32Array UInt32Array Float32Array Float64Array
//构造函数使用方式一
var typeArr = new Int16Array(buffer,2,3);//ArrayBuffer,开始位置（默认0），长度（默认到结束位置）
//构造函数使用方式二 先构建再赋值
var typeArr2 = new Int8Array(8);
typeArr2[0]=10;
typeArr2[1]=20;
//构造函数使用方式三 接受另一格式TypedArray 底层内存不一样
var typeArr3= new Int16Array(new Uint16Array(4));
//构造函数使用方式四 arrayLikeObject
var typedArray = new Uint8Array([1,2,3,4]);
//转换回数组格式
var normalArray = Array.prototype.slice.call(typedArray);

//数组方法对TypedArray都适用 除concat方法
function concatenate(resultConstructor,...arrs){
    let totalLength = 0;
    for(let arr of arrs){
        totalLength +=arr.length;
    }
    let result = new resultConstructor(totalLength);
    let offset= 0;
    for(let arr of arrs){
        result.set(arr,offset);
        offset +=arr.length;
    }
    return result;
}
console.log(concatenate(Uint8Array,Uint8Array.of(1,2),Uint8Array.of(3,4)));
//字节序 小端字节序 重要的排在前面，不重要排在后面，高数位在前，低数位在后
//uInt16View[0]=255  [0xFF,0x00]

//已知字符串编码方法 互相转换
function ab2str(buf){
    return String.fromCharCode.apply(null,new Uint16Array(buf));
}
function str2ab(str){
    var buf =new ArrayBuffer(str.length*2);
    var bufView = new Uint16Array(buf);
    for(var i=0,strLen=str.length;i<strLen;i++){
        bufView[i]=str.charCodeAt(i);//0x**** 16进制
    }
    return buf;
}

