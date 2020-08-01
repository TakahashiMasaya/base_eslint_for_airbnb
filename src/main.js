/**
 * main.ts
 */
var DATA = [
    { name: 'hoge1', age: 30, addr: 'Fukuoka' },
    { name: 'hoge2', age: 40, addr: 'Osaka' },
    { name: 'hoge3', age: 50, addr: 'Nagoya' },
    { name: 'hoge4', age: 20, addr: 'Tokyo' },
];
var htmlStr = "<div class=\"table\">" + DATA.map(function (_data) { return "<div class=\"rows\"><div class=\"col\">" + _data.name + "</div><div class=\"col\">" + _data.age + "</div><div class=\"col\">" + _data.addr + "</div></div>"; }).join('') + "</div>";
// test
document.getElementsByTagName('div')[0].insertAdjacentHTML('afterbegin', htmlStr);
// const a = 50 / 30 * 20 + (10 / 30) as number;
