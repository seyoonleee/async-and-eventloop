// - Promise
// 비동기를 간편하게 처리할수있도록 도와주는 Object이다.
// 정상적으로 수행했다면 처리된 결과값을 전달해준다.
// 수행을 못했다면 error를 전달해준다.

// State : pending -> fulfilled or rejected
// pending : (어떤 일이) 있을 때 까지, ...을 기다리는 동안
//    promise가 만들어져서 지정한 명령이 수행중일때 pending!
// fulfil : (약속, 요구 등을) 이행하다 - 과거형 fulfilled
//    명령을 성공적으로 끝내면 fulfilled!
// reject : 거부하다 - 과거형 rejected
//    데이터를 찾을 수 없거나 네트워크에 문제가 생긴다면 rejected!

// Producer
// 기능을 수행해서 해당하는 데이터를 만들어내는 Promise 객체

// Consumer
// Promise로 반환된 데이터를 소비한다.

// 1. Producer
const promise = new Promise((resolve, reject) => {
  // console.log('doing something...');
  setTimeout(() => {
    resolve('ellie');
    // reject(new Error('no network'));
  }, 2000);
});
// console.log(promise);

// Promise() 생성자
// Promise 생성자는 주로 프로미스를 지원하지 않는 함수를 감쌀 때 사용.
// 이게 무슨 말이냐 promise를 지원한다는 말은 함수의 반환값이 Promise 객체인것을 말하고
// 반대로 지원하지 않는다는것은 함수의 반환값이 Promise객체가 아닌것을 말한다.
// 대표적인 Promise 지원 함수 : fetch, axios
// 대표적인 Promise 미지원 함수 : setTimeOut

// 새로운 Promise객체가 만들어질때 Promise에 전달한 콜백함수가 바로 실행된다. 어떤 원리로 콜백함수가 바로실행이 되냐면
// Promise 객체 뿐만아니라 다른 클래스를 인스턴스화할때 constructor메소드의 내부 로직이 실행되는 원리이다.

// Promise를 리턴하는 함수의 형태는 아래와 같다.
// 보통 Promise를 지원하는 api는 비동기인데(fetch,then
// Promise를 지원하는 동기적인 api도 있나요?
// 무거운 작업을하는 동기적인 코드를 프로미스를 활용하지않을까?
const asyncfunc = (param1, param2) => {
  return new Promise((resolve, reject) => {
    if ('성공') resolve('결과');
    else reject(new Error(err));
  });
};

class Test {
  constructor() {
    console.log(`constructor 실행`);
  }
}

const test = new Test();
// console.log(test.say());

// 2. Consumer : then, catch, finally
// 위의 메소드로 값을 받아올수있다.
// 프로미스 값이 정상적으로 잘 수행이 된다면(resolve가 호출된다면) resolve메소드의 Param으로 값을 전달한다.
// resolve로 전달된 값은 chaining을 활용하여 promise객체의 메소드인 then의 첫번째 콜백함수의 Param으로 전달된다.
// 수행이 안된다면(reject가 호출된다면) promise객체의 메소드인 catch를 이용하여 Error handling을 이행 할 수 있다.
// Promise의 finally는 성공 실패 여부를 떠나서 무조건 실행된다.
promise
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    // console.log(error);
  })
  .finally(() => {
    console.log('finally');
  });
// console.log('다음명령 실행');

const promiseThen = promise.then();
// console.log('promiseThen', promiseThen);
const promiseCatch = promise.then().catch();
// console.log('promiseCatch', promiseCatch);

/**then() */
// 이행한 프로미스를 받으면 'then' 블록도 바로 실행되지만,
// 핸들러는 아래 console.log에서와 같이 비동기적으로 실행됨
const resolvedProm = Promise.resolve(33);

let thenProm = resolvedProm.then(value => {
  console.log(
    '이 부분은 호출 스택 이후에 실행됩니다. 전달받은 값이자 반환값은 ' +
      value +
      '입니다.'
  );
  return value;
});
// thenProm의 값을 즉시 기록
console.log(thenProm);

// setTimeout으로 함수 실행을 호출 스택이 빌 때까지 미룰 수 있음
setTimeout(() => {
  console.log(thenProm);
});

// 로그 출력 결과 (순서대로):
// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
// "이 부분은 호출 스택 이후에 실행됩니다. 전달받은 값이자 반환값은 33입니다."
// Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 33}

// 3. Promise Chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    // then의 첫번째 인자인 reject함수는 값을 바로 반환해도되고 새로운 Promise 객체를 반환할수있다.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num - 1);
      }, 1000);
    });
  })
  .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });

const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // return resolve(`${hen} => 🥚`);
      return reject(new Error(`error! 달걀없다`));
    }, 1000);
  });

const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${egg} => 🥘`);
    }, 1000);
  });

getHen()
  .then(hen => getEgg(hen))
  .catch(err => {
    console.log(err);
    return '🥖';
  })
  .then(egg => cook(egg))
  .then(meal => console.log(meal))
  .catch(err => console.log(err));
