// setTimeout의 콜백함수는 비동기 함수이다.
// setTimeout(() => {
//   console.log('비동기작업 실행!');
// }, 0);
// const res = fetch('https://jsonplaceholder.typicode.com/posts');
// const foo = () => {
//   return fetch('https://jsonplaceholder.typicode.com/posts');
// };
// console.log(foo().then(res => console.log(res.json())));
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');

// const resolvedProm = Promise.resolve(33);

// let thenProm = resolvedProm.then(value => {
//   console.log(
//     '이 부분은 호출 스택 이후에 실행됩니다. 전달받은 값이자 반환값은 ' +
//       value +
//       '입니다.'
//   );
//   return value;
// });

// let thenProm = fetch('https://jsonplaceholder.typicode.com/posts').then(
//   value => {
//     console.log(
//       '이 부분은 호출 스택 이후에 실행됩니다. 전달받은 값이자 반환값은 ' +
//         value +
//         '입니다.'
//     );
//     return value;
//   }
// );

// thenProm의 값을 즉시 기록
// console.log(thenProm);

// setTimeout으로 함수 실행을 호출 스택이 빌 때까지 미룰 수 있음
// setTimeout(() => {
//   console.log(thenProm);
// });
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');
// console.log('1');

// new Promise((resolve, reject) => {
//   console.log('doing something...');

//   if (1) console.log(resolve('asdf'));
// });

// console.log('go');

// const promise = new Promise((resolve, reject) => {
//   console.log('doing something...');

//   setTimeout(() => {
//     resolve('res');
// reject(new Error('no network'));
//   }, 2000);
// });
// console.log(promise);
// console.log(
//   promise.then(res => {
//     return res;
//     console.log(res);
//   })
// );
// console.log(new Promise(resolve => resolve('res')));

// const promise = new Promise((resolve, reject) => {
//   console.log('doing something...');
//   setTimeout(() => {
//     // resolve('ellie');
//     reject(new Error('no network'));
//   }, 2000);
// });

// promise.catch(() => {});
