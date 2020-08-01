/**
 * main.ts
 */

type UURL = {
  href: string | ((row: any) => string);
  newWindow?: boolean;
  direction?: string;
  sortAction?: (e: any) => void;
};

type CHECKBOX = {
  name: string | ((row: any) => string);
  disabled?: boolean | ((row: any) => boolean);
  checked?: boolean | ((row: any) => boolean);
  onChange?: (e: any) => void;
};

type FORWARD_BUTTON = {
  name: string | ((row: any) => string);
  display?: boolean | ((row: any) => boolean);
  href: string | ((row: any) => string);
  onClick?: (e: any, row: any) => void;
};

type EXECUTE_BUTTON = {
  name: string | ((row: any) => string);
  display?: boolean | ((row: any) => boolean);
  onClick?: (e: any, row: any) => void;
};

type SPECIFIED_TEXT = {
  text: string;
};

type TEXT = {
  text: string;
  direction?: string;
  sortAction?: (e: any) => void;
};

type TYPE = UURL | CHECKBOX | FORWARD_BUTTON | EXECUTE_BUTTON | SPECIFIED_TEXT | TEXT;

const DATA = [
  { name: 'hoge1', age: 30, addr: 'Fukuoka' },
  { name: 'hoge2', age: 40, addr: 'Osaka' },
  { name: 'hoge3', age: 50, addr: 'Nagoya' },
  { name: 'hoge4', age: 20, addr: 'Tokyo' },
] as { name:string, age:number, addr:string }[];

const htmlStr = `<div class="table">${DATA.map((_data) => `<div class="rows"><div class="col">${_data.name}</div><div class="col">${_data.age}</div><div class="col">${_data.addr}</div></div>`).join('')}</div>` as string;

// test
document.getElementsByTagName('div')[0].insertAdjacentHTML('afterbegin', htmlStr);

// const a = 50 / 30 * 20 + (10 / 30) as number;
