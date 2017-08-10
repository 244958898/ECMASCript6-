//非严格模式 八进制
0o11===011;
//严格模式 
0o11===011;//报错
console.log(Number('0b111'));
console.log(Number('0o10'));

//检查特殊值 是否非无穷数，NaN
Number.isFinite(15);//true
Number.isNaN(NaN);//true

Number.parseInt('11.3');
Number.parseFloat('123.35#');

Number.isInteger(24.0);//true

//Es5实现isIteger方法
(function(global){
	var floor = Math.floor,isFinite = global.isFinite;
	Object.defineProperty(Number,'isIteger',{
		value:function isIteger(value){
			return typeof value ==='number' && isFinite(value) && value>-9007199254740992&&value< 900719925470992&&floor(value)===value;
		},
		configurable:true,
		enumerable:false,
		writable:true
	});
})(this);

//EPSILON常量 --可以接受的误差范围
// Number.EPSILON.toFixed(20)  '0.0000000000000000022204'
// 5.551115123125783e-17 <Number.EPSILON;//true


//js准确表示的整数是有范围的 -2{53}~2{52}之间为安全范围 -9007199254740992~9007199254740992
// true Number.MAX_SAFE_INTEGER ===Math.pow(2,53)-1 ===9007199254740991
// true Number.MAX_SAFE_INTEGER ===-Number.MAX_SAFE_INTEGER
// 判断整数是否为该范围内
// Number.isSafeInteger(9007199254740991) true
// Number.isSafeInteger(9007199254740992) false

// 验证结果返回true 并一定代表运算正确
// Number.isSafeInteger(900719925470993-990) ===900719925470002
// 注意left数不是安全整数 保存为900719925470992 再减去990 最后输出...002、


//Math对象的扩展
//Math.trunc(4.1) 4 用处：去除小数部分
//先转为数值，不能转则返回NaN

console.log(Math.sign(-2));//2 =>1  0=>+0  -0=>-0 NaN||'foo'||空=>NaN

//计算立方根 8=》2
Math.cbrt('8')===2;
Math.cbrt('foo')===NaN;

//count leading zero 缩写
//Js整数用32位2进制表示，该方法返回前面有多少个前导0
Math.clz32(0)===32;
Math.clz32(0b010000000000000000000000000000)===1;

//与左移运算符结合
Math.clz32(1)===31;
Math.clz32(1<<1)===30;

//小数只考虑整数部分;其他类型转为数值再运算，不能转则与NaN一样返回32
Math.clz32(1.2)===31;

//32位带符号整数形式相乘；当位数太大超出整数范围时，可以正确返回低位数值
Math.imul(2,4)===8;

//返回最接近的单精度浮点数，整数原值返回，针对无法用64表示的小数
Math.fround(1.337)===1.3370000123977661;

//返回参数平方和的平方根，参数会转为数值
Math.hypot(3,4); //5

//e的x次方减1
Math.expm1(0)===0;
//Math.log(1+x)
Math.log1p(0)===0;
//Math.log10()===lg()
//Math.log2()===log2(x)
//Math.sinh() Math.cosh() Math.tanh() Math.asinh() Math.acosh() Math.atanh()

//指数运算符=>ES7
//2**3=>8
//a**=3 => a的三次方






