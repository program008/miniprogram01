// common.js
// exports 是 module.exports 的一个引用，因此在模块里边随意更改 exports 的指向会造成未知的错误。
// 所以更推荐开发者采用 module.exports 来暴露模块接口，除非你已经清晰知道这两者的关系。
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

module.exports.sayHello = sayHello
exports.sayGoodbye = sayGoodbye