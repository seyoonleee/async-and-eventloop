// 자바스크립트는 동기적이다. hoisting이 된 이후부터 작성한 코드 순서에 따라 실행하는것을 말한다.
// 호이스팅에 대해서 좀 더 자세하게 알아봐야겠다. 실제로 const도 호이스팅이 발생하는걸로 아는데...
console.log('1');
setTimeout(() => console.log('2'), 3000);
console.log('3');

// 개인적으로 정리한 동기, 비동기의 의미
// 일단 동기란 직역하자면 같은 시점을 말한다. 여기서 같은 시점이라고 했는데 그러면 대상이 2개 이상일것이다.
// 이 대상들은 명령을 말한다. 그래서 자바스크립트의 동기는 무엇을 말하냐? 시점인데 어떤 시점이 같다는 걸까?
// 내가 정리한 결론은 명령의 끝나는 시점")"과 다음 명령의 시작시점"("이 같다는걸 의미한다. 아래를 보면 명령1의 끝나는 시점과
// 명령2의 시작시점이 같다.
// (명령 1...................)
//                          (명령 2..............................................)
//                                                                              (명령3...)
// 반대로 비동기는 한 명령의 끝나는 시점")"과 다음 명령의 시작 시점"("이 같지 않다는것을 의미한다. 반대로
// (명령 1........................)
//  (명령 2.......)
//   (명령3...)
// 정리하자면 동기, 비동기의 기준이 되는 시점은 명령이 끝나는 시점과 그 다음 명령이 시작되는 시점이다.

// Synchronous callback
const printImmediately = print => print();
printImmediately(() => console.log('hello'));

// Asynchronous callback
const printWithDelay = (print, timeout) => {
  setTimeout(print, timeout);
};
printWithDelay(() => console.log('async callback'), 2000);
// 비동기 동작 과정
// 1. printWithDelay가 호출되면서 callStack에 추가된다.
// 2. callstack에서 비동기 함수 setTimeout을 브라우저로 보낸다.
// 3. printWithDelay 함수 본문이 끝나면 callStack에서 printWithDelay가 비워진다.

// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      error => {}
    );
  },
  error => {
    console.log(error);
  }
);

// 콜백 체인의 문제점(콜백 지옥)
// 가독성이 좋지 않다보니 유지보수와 디버깅이 어렵다. 즉 dx가 안좋다.
