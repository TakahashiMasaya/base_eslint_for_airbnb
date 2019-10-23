/**
 * main.ts
 */

const DATA = [
  { name: 'hoge1', age: 30, addr: 'Fukuoka' },
  { name: 'hoge2', age: 40, addr: 'Osaka' },
  { name: 'hoge3', age: 50, addr: 'Nagoya' },
  { name: 'hoge4', age: 20, addr: 'Tokyo' },
] as { name:string, age:number, addr:string }[];

const htmlStr = `<div class="table">${DATA.map(_data => `<div class="rows"><div class="col">${_data.name}</div><div class="col">${_data.age}</div><div class="col">${_data.addr}</div></div>`).join('')}</div>`;
// test
document.getElementsByTagName('div')[0].insertAdjacentHTML('afterbegin', htmlStr);
