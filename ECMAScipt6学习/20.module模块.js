//历史上主要是AMD->浏览器 CommonJS->服务器端两种模块化的加载模式
//ES6模块的设计思想：尽量静态化-》编译时加载（从模块加载特定方法，其他方法不加载）
//21.5数组复制
const itemsCopy=[...items];
//类数组对象
const foo = document.querySelectorAll('.foo');
const nodes =Array.from(foo);

//21.6 函数
(()=>{})();
