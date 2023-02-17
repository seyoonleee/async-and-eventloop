// async & await
// clear style of using promise

// 1. Promise
const fetchUser = () => {
  // do network request in 10 secs...
  return new Promise((resolve, reject) => {
    console.log('바로실행');
    // resolve reject를 이용해서 완료를 해줘야 된다.
    resolve('seyoon');
  });
};

const user = fetchUser();
user.then(name => console.log(name));
console.log(user);
// [콘솔 출력 순서]
// 1. '바로실행'
// 2. Promise {<fulfilled: 'seyoon'}
// 3. 'seyoon'

// [실행 순서]
// anonymous() -> fetchUser() -> new Promise() -> Promise() 생성자의 콜백함수가 동기적으로 바로 실행 -> console.log('바로실행')
// anonymous() -> fetchUser() -> new Promise() -> Promise() 생성자의 콜백함수가 동기적으로 바로 실행
// anonymous() -> fetchUser() -> new Promise() -> Promise() 생성자의 콜백함수가 동기적으로 바로 실행 -> resolve('seyoon')
// anonymous() -> fetchUser() -> new Promise() -> Promise() 생성자의 콜백함수가 동기적으로 바로 실행
// anonymous() -> fetchUser() -> new Promise()
// anonymous() -> fetchUser()
// anonymous()
// anonymous() -> user.then() => 큐로 보냄 anonymous(name => console.log(name))
// anonymous()
// anonymous() -> console.log(user)
// anonymous()
// 콜스텍 완전 비워짐. main함수가 끝남
// 이벤트루프가 콜스택을 체크하고 비었을때 큐에서 제일 먼저 들어온 함수를 콜스택으로 보냄
// (name => console.log(name))()
// (name => console.log(name))() -> console.log(name)
// (name => console.log(name))()
// 끝

// 2. async
// async라는 키워드를 쓰면 함수의 본문이 Promise로 변경된다.
// const fetchUser2 = async () => {
//   // do network request in 10 secs...
//   console.log('바로실행');
//   return 'seyoon';
// };

// const user2 = fetchUser2();
// user2.then(name => console.log(name));
// console.log(user2);

// 3. await
// 프로미스의 state가 fulfilled or rejected 가 될때까지 async 함수의 실행을 일시 정지한다.
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const getBanana = async () => {
  await delay(1000);
  return '🍌';
};

const getApple = async () => {
  await delay(2000); // 3초동안 코드 실행 정지. 3초후 state가 fulfilled or rejected되면 Promise객체를 반환함.
  console.log('실행되나?');

  return '🍎';
};

// async 키워드로인해 promise객체가 pending상태로 바로 리턴됨.
console.log(getApple()); // Promise {<pending>}

// const pickFruits = async () => {
//   console.log('pickFruits 함수 실행');

//   console.log('사과 따는 중...');
//   const apple = await getApple();
//   console.log(`${apple} 획득!`);

//   console.log('바나나 따는 중...');
//   const banana = await getBanana();
//   console.log(`${banana} 획득!`);

//   return `${apple} + ${banana}`;
// };

// console.log(pickFruits());

// 4. await 병령 처리
// const pickFruits2 = async () => {
//   const applePromise = getApple();
//   const bananaPromise = getBanana();
//   const apple = await applePromise;
//   const banana = await bananaPromise;

//   return `${apple} + ${banana}`;
// };

// console.log(pickFruits2().then(res => console.log(res)));
// 서로 연관없는 비동기 코드는 await를 병렬로 처리하는게 좋다.

// 5. await 병렬 처리 - Promise.all()
// 배열로 전달된 Promise들이 병렬적으로 처리되어 처리된 값이 배열에 담긴다.
// const pickAllFruits = () => {
//   return Promise.all([getApple(), getBanana()]).then(fruits =>
//     fruits.join(' + ')
//   );
// };

// pickAllFruits().then(res => console.log(res));

// 6. Promise.race()
// 여러 비동기 함수중 가장 먼저 처리되는 비동기함수의 값을 얻을때
// const pickOnlyOne = () => {
//   return Promise.race([getApple(), getBanana()]);
// };

// console.log(pickOnlyOne());
// pickOnlyOne().then(pick => console.log(pick));
