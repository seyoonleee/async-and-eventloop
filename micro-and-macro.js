// Promise.resolve().then(() => {
//   console.log('promise');
//   setTimeout(() => console.log('time in promise'), 1000);
// });
// setTimeout(() => console.log('time'), 0);

const myFunc = async () => {
  console.log('myFunc 실행');
  const name = await Promise.resolve('seyoon');
  console.log(name);
};

console.log('Start');
myFunc();
console.log('End');

// 1. 'Before function!' 찍힌다.
// 2. 'myFunc 실행' 찍힌다.
// 3. Promise.resolve('seyoon') 동기적으로 실행되어 resolve된 Promise객체 반환된다.
//    헷갈림 주의 !!! resolve된 Promise값이 아니라 resolve된 Promise객체임!!!!!!
// 4. await를 만난다.
// 5. myFunc은 함수실행을 중단하고 microtask 큐로 이동한다.
// 6. myFunc을 나와 실행컨텍스트(현재는 global)에 있는 코드를 계속해서 실행한다.
// 7. 'After function!'을 찍고 로그함수는 제거된다.
// 8. 이벤트 루프가 비어있는 콜스택으로 마이크로태스크큐에 대기중인 myFunc을 보낸다.
// 9. myFunc의 실행중단 부분 부터 코드를 실행한다.
// 10. name 변수는 resolve된 Promise값을 전달 받는다. 객체아닌 값.
// 11. console.log(name)실행
