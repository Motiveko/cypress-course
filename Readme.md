# The Complete Cypress 10+ Course: From Zero to Expert!

- Udemy의 Cypress 강의 학습 The Complete Cypress 10+ Course: From Zero to Expert!

## [특징](https://docs.cypress.io/guides/overview/why-cypress#Features)

- mocha로 구현되어 있다
- 디버깅 쉬움
- 비동기 동작에 대해 awaiting 자동으로 해준다.
  mocking
- [selenium이나 webdriver](https://imfly.gitbooks.io/electron-docs-gitbook/content/ko-KR/tutorial/using-selenium-and-webdriver.html)를 사용하지 않는다.
- 테스트 결과 스샷, 비디오 제공
- cross-broser testing

<br>

## [trade off](https://docs.cypress.io/guides/references/trade-offs)

- cypress는 일반적인 자동화 툴이 아니다.(크롤링같은거에 쓰지 말자)
- cypress command는 브라우저에서 동작한다.
  - browser js를 사용해야한다.
  - 서버사이드 패키지 사용불가
- 동시에 multiple browser tab 지원 안됨
- 각 테스트는 single origin이다 => v9.6부터 [cy.origin()으로 한 테스트에서 multiple origin 가능](https://docs.cypress.io/guides/references/trade-offs#Multiple-browsers-open-at-the-same-time)하다는데..

<br>

## [타입스크립트 설정](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)

- `package.json`에 타입스크립트 의존성이 있으면 알아서 테스트를 `*.cy.ts`로 만들어준다. 설정도 알아서 ts로 만들어준다.
- `cypress/`폴더 내부에 `tsconfig.json`을 넣어준다. 설정은 공식문서 참고. 이거까지만 하면 동작은 문제없음

<br>

## mocha

- 테스트 단위는 `describe`(suite)/`it`(case) 으로 나눔
- mocha hook
  - `before` : 테스트(`describe`) 시작 전에 실행( === `beforeAll` )
  - `after` : 테스트(`describe`) 실행 다하고 실행 ( === `afterAll` )
  - `beforeEach`/ `afterEach` : 각 테스트 케이스(`it`) 실행 전/후에 실행
- `skip`, `only`: 테스트 실행시 suite/case에서 실행할 테스트를 선택/제외 할 수 있다.

<br>

## UI 테스트

> http://uitestingplayground.com : ui 테스트하며 놀 수 있도록 만든 사이트. 여러가지 요소들을 테스트해볼 수 있다. 이걸 기반으로 한다.

### visit

- baseUrl 설정
  - `cypress.config.ts`에 설정
  - cli 실행시 `--config baseUrl={{URL}}` 전달

### [Subject management](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Subject-Management)
- cypress command는 모두 `cy.{command}` 형태로 사용된다. 이 때 command는 `Chainabe Subject`를 `yield`하여 이를 통해 cypress command 체이닝 할 수 있게 된다.
- 중요한점은 `Chainabe Subject`을 `return`하는게 아니라 `yield`한다는 점이다. 이유는 cypress가 비동기적으로 동작해야 하기 때문인데, cypress는 **테스트 코드를 평가하고 큐잉한 다음 순차적으로 실행**한다. 이 과정에서 비동기 동작이 있고, 그런 동작에 대해 timeout도 쉽게 설정해 줄 수 있게 된다. 이 컨셉을 인지하고 있는게 굉장히 중요하다. ~~잘못 이해하면 테스트 코드를 잘못 짜서 실패하는데 원인을 알 수 없게된다..~~

<br>

### BDD assertion
- cypress는 `chai`기반의 BDD assertion을 제공한다.
- 예를들어 아래와 같은 영어로된 assertion을 테스트한다고 해보자
```
After clicking on this <button>, I expect its class to eventually be active.
```
- 코드는 아래와 같다.
```ts
cy.get('button').click().should('have.class', 'active');
```
- 테스트 할 동작(behavior)를 정의하고, 테스트 코드를 짤 때 해당 동작과 거의 비슷한 형태의 테스트 코드를 짤 수 있다. 중간중간에 `timeout`, `retry`등을 제공하는건 덤이다.

- [BDD](https://docs.cypress.io/guides/references/assertions#BDD-Assertions)뿐만 아니라 [TDD](https://docs.cypress.io/guides/references/assertions#TDD-Assertions) assertion도 제공한다. 역시 `chai` 기반인데, 나는 이 둘을 구분도 안하고 썼었다. 이번기회에 차이를 잘 인지해보자..

<br>

- [cypress command에도 기본적으로 assertion이 구현](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Default-Assertions)되어 있다.
  - 예를들어 `cy.visit()`은 응답이 `Content-Type: text/html`에 `http status : 200`이어야 한다.

<br>

### [.then() vs .should()](https://docs.cypress.io/api/commands/and#Subjects)
- `should()`는 assertion을 바로 할 때 쓰고, `then()`은 assertion 전에 뭔가 작업이 필요할 때 쓰면 된다.(ex. logging)

<br>

## CSS & XPath Selectors
- [`cy.get()`](https://docs.cypress.io/api/commands/get) : [CSS Selector](https://www.w3schools.com/cssref/css_selectors.asp)로 DOM요소를 쿼리하고 싶을 때 사용한다.
- [`cy.contains()`](https://docs.cypress.io/api/commands/contains): DOM 요소르 `text content`로 쿼리하고 싶을 때 사용한다.
- [`cy.find()`](https://docs.cypress.io/api/commands/find): 어떤 요소의 자식 요소를 찾을때 사용한다.
  - 먼저 DOM을 쿼리하고 자식을 찾아야 하므로 `get`, `contains`에 체이닝 해서 쓰게 된다.
  - 이 때, 예를들어 `get`으로 쿼리한 결과가 여러개라도 [`find`는 만족하는 결과가 나올때까지 여러개의 DOM요소에다가 find를 retry한다.](https://docs.cypress.io/api/commands/find#Assertions)
  ```ts
  // div가 여러개라도 button을 가진 녀석을 알아서 찾아낸다.
  cy.get('div').find('button').should('have.text', 'Button with Dynamic ID');
  ```
  - 위 코드에서 `find` 뒤에 `should` assertion이 체이닝 되었는데, find는 `div > button` 요소(들)에서 should를 만족하는 애를 찾을때까지 retry 하게 된다.


- cypress는 기본적으로 [`XPath`](https://devhints.io/xpath)는 지원하지 않는다. 이걸 쓸려면 [cypress-xpath](https://www.npmjs.com/package/cypress-xpath) 플러그인을 설치해야 한다.
  - 설치
  ```bash
  npm install -D cypress-xpath
  ```
  - cypress support에 모듈 추가(전역)
  ```ts
  // cypress/support/e2e.ts
  require('cypress-xpath');
  ```
  - 타입스크립트 types 추가(TypeScript and IntelliSense support)
  ```js
  // tsconfig.js
  {
    "compilerOptions": {
      "types": ["cypress", "cypress-xpath"]
    }
  }
  ```
  > 참고 : [types에 `cypress`, `cypress-xpath`를 추가해야 하는 이유 ](https://typescript-kr.github.io/pages/tsconfig.json.html): `cy.command()`는 전역으로 사용되어 `import cy from 'cypress'` 같은게 없다. 따라서 cy라는 커맨드에 대한 타입을 컴파일러 옵션에 직접 전달해줘야 타입스크립트가 이게 전역변수로 존재하는 객체라는걸 알고 자동완성을 시켜주게 된다. `cypress-xpath`도 마찬가지. 즉 모듈 import 없이 전역으로 쓰는 애들의 타입은 `compilerOptions.types`에 추가해줘야 한다.
  
  - `cy.xpath()` 커맨드로 xpath 기반으로 DOM 쿼리가 가능해진다! 
    - 하지만 xpath보다 그냥 css selector가 훨씬 직관적이고 편하다.
  - DOM요소의 css 속성값 테스트는 아래와 같은 형태로 한다.
  ```ts
  // .should('have.css', 'key', 'value')
  .should('have.css', 'background-color', 'rgb(0, 123, 255)')
  ```
    - 이 때 색상은 hex가 아닌 rgb로 해야한다는 번거로움이 존재한다. ~~[hex-to-rgb](https://www.rapidtables.com/convert/color/hex-to-rgb.html)사이트들을 적극 활용하자.~~
      - 개발자도구에서 Elements - Computed 를 가면 rgb로 계산된 값을 볼 수 

<br>

## Automatic Waits([Retry-ability](https://docs.cypress.io/guides/core-concepts/retry-ability#What-you-ll-learn), explained)
- cypress에서 여러가지 비동기 동작에 대해 [timeout을 설정](https://docs.cypress.io/guides/references/configuration#Timeouts)할 수 있다. 대표적으로 
  - `pageLoadTimeout` : `visit()`, `go()`, `reload()`에 대한 timeout
  - `defaultCommandTimeout`: DOM based timeout (`get()`, `find()`, ...)
- `cypress command`에 체이닝된 `assertion`에 타임아웃을 걸 땐 체이닝한 command에다가 `timeout` 옵션을 전달하면 된다.
```ts
cy
  .get('#progressBar', {timeout: 25000}) // 요소에 75% text가 있는지에 대한 assertion을 25초동안 retry한다.
  .should('have.text', '75%'); 
```
- 깊은 depth를 가지는 DOM 요소 등을 쿼리할 때, 가급적 쿼리는 한방에 작성하는게 좋다.([Merging Queries](https://docs.cypress.io/guides/core-concepts/retry-ability#Merging-queries))
  - 이유는 쿼리를 쪼개게 되면, 한번 성공한 쿼리는 재시도 하지 않기 때문인데 이건 문제가 될 수 있는 여지가 있다. 예를들면 아래와 같은 케이스다.
  ```ts
  it('adds two items', () => {
    cy.visit('/')

    cy.get('[data-testid="new-todo"]').type('todo A{enter}')
    cy.get('[data-testid="todo-list"] li label') // 1 query command
      .should('contain', 'todo A') // assertion

    cy.get('[data-testid="new-todo"]').type('todo B{enter}')

    // 🛑 bad 
    cy.get('[data-testid="todo-list"] li')
      .find('label') // 쿼리 분리
      .should('contain', 'todo B') 

    // ✅ good
    cy.get('[data-testid="todo-list"] li label') // 1 query command
      .should('contain', 'todo B') // assertion
  })
  ```
  > 이게 테스트 성공/실패를 가르는건 잘 모르겠다. bad/good 케이스 모두 어차피 성공할 것 같은데.. 고민이 필요하다.
  - DOM 쿼리가 아닌 아닌 다른 사례도 있다. window 객체의 프로퍼티를 쿼리하는 것과 같이 javascript 객체 쿼리도 한번에 묶도록 하자.
  ```ts
  // 🛑 not recommended
  // only the last "its" will be retried
  cy.window()
    .its('app') // runs once
    .its('model') // runs once
    .its('todos') // retried
    .should('have.length', 2)

  // ✅ recommended
  cy.window()
    .its('app.model.todos') // retried
    .should('have.length', 2)
  ```
  
- 팁으로, 좀 긴 테스트를 체이닝 하는 경우가 있다. `cy.command().assertion().command().assertion()....`같은 형태다.
```ts
cy.get('[data-testid="todo-list"] li') // command
  .should('have.length', 1) // assertion
  .find('label') // command
  .should('contain', 'todo A') // assertion
```

<br>

## Click, Hover, and Dynamic Table Challanges
- click은 간단하다. cy.get().click() 이후에도 계속 체이닝하면 된다.

### Hover
- cypress는 [`cy.hover()` 형태의 hover 동작을 메서드로 제공하지 않는다.](https://docs.cypress.io/api/commands/hover).
- [몇가지 대안이 있다.](https://docs.cypress.io/api/commands/hover#Workarounds)
  - `trigger('mouseover')`: mouseover 이벤트를 발생시키는 형태로 보인다. 근데 이 방법은 javascript의 `onmouseenter` 핸들러는 트리거 시킬수 있는데, ***css `:hover`에는 동작하지 않는다.***
  -  [`invoke('show').click()`](https://docs.cypress.io/api/commands/hover#Invoke) : 최종적으로 클릭하는거다. 
  - forceClick, custom command..

- 근데 위 대안들(workarounds)은 문제가 생길 여지가 있다. cypress의 기본 이벤트는 untrusted(`event.isTrusted: false`)이기 때문.
- [cypress-real-event](https://github.com/dmtrKovalenko/cypress-real-events)패키지가 좋은 대안이다. [Chrome Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/)를 사용해서 [실제 native system event가 발생하는것과 동일한 형태의 이벤트를 발생시킨다](https://github.com/dmtrKovalenko/cypress-real-events#why)고 한다. 크로미눔 브라우저에서만 동작하므로 firefox 환경은 사용 불가라고 한다.
  - 설치는 [공식문서 Installation](https://github.com/dmtrKovalenko/cypress-real-events#installation)에 매우 친절히 나와있따.
  - `cypress/support/index.ts`에 `import 'cypress-real-events/support';`추가하는것만 cypress v10부터 `cypress/support/e2e.ts`에 추가해주면 된다.

- [참고] hover 관련해서 class가 바뀌는 경우를 테스트할 때 메서드 체이닝으로 테스트하면 안된다.

<br>

### Dynamic Table
- `cy.get(selector).each(callback)`를 이용해서 쿼리한 돔 요소를 순회하면서 콜백함수를 수행할 수 있다.
  - 이 때 callback함수의 인자인 DOM 요소 타입은 `JQuery<HTMLElement>`인데, `next()`/ `prev()` 메서드를 이용해서 형제 요소를 찾을 수 있다. `nextUntil()`, `nextAll()`, `parent()`등의 다양한 메서드가 있다.


<br>

## [Enviroment Variables](https://docs.cypress.io/guides/guides/environment-variables)
- 환경변수. 테스트 코드에서 `Cypress.env(KEY)`로 읽어서 사용할 수 있다.
- 설정하는 방법은 크게 4가지다.
  - `cypress.config.ts`파일의 `env`
  - `cypress.env.json`에 작성
  - `CPYRESS_*` 환경변수(OS 레벨인듯)에다가 설정하기
  - cli로 실행시 --env로 전달
  - `describe`, `it`에서 설정
    ```ts
    // 요런식..
    describe(
      'test against Spanish content',
      {
        env: {
          language: 'es',
        },
      },
      () => {
        it('displays Spanish', () => {
          cy.visit(`https://docs.cypress.io/${Cypress.env('language')}/`)
          cy.contains('¿Por qué Cypress?')
        })
      }
    )
  
    // 개별 test case에도 적용가눙
    it(
      'smoke test develop api',
      {
        env: {
          api: 'https://dev.myapi.com',
        },
      },
      () => {
        cy.request(Cypress.env('api')).its('status').should('eq', 200)
      }
    )
    ```

- ### 🔥🔥🔥 [Environment variables Recipe](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/server-communication__env-variables)를 따라해보자. [`dotenv`](https://www.npmjs.com/package/dotenv)에 profile별 환경변수를 작성하고, 이를 `cypress.config.js`파일에서 읽어서 환경 변수를 설정할 수 있게 할 수 있다.🔥🔥🔥

<br>

## Viewport
- cypress는 테스트 실행시 뷰포트 크기를 코드에서 지정할 수 있다. 이거는 실제 화면 픽셀과 별개로, 브라우저 크기를 줄여도 고정되어있다.
  ```ts
  // cypress.config.ts
  export default defineConfig({
    // ...
    viewportHeight: 1000,
    viewportWidth: 1400,
  });
  ```
- 설정파일은 기본값이고, 매 테스트 케이스에서 [`cy.viewport()`](https://docs.cypress.io/api/commands/viewport)메서드를 이용해서   뷰포트 크기를 조정할 수 있다!
  ```ts
  cy.viewport('iphone-6');  // preset
  cy.viewport(400, 600);  // (width, heigth)
  ```


## CORS 관련 오류
  - [페이지 접근(`visit`)시 테스트환경에서 CORS가 발생하는 경우](https://docs.cypress.io/guides/references/error-messages#Cypress-detected-that-an-uncaught-error-was-thrown-from-a-cross-origin-script)가 있다. 이 때 이게 exception을 발생시키는데, 테스트코드에서 이를 catch 하지 못해서 `Uncaught Exceptions` 이벤트가 전역에서 발생하게 되고 테스트가 실패한다.
  - [support파일에서 `Uncaught Exceptions`이벤트를 listen한 뒤 이걸 무시하도록 처리할 수 있다](https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions)
  ```ts
  // cypress/support/exception.ts
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  ```

  ```ts
  // cypress/support/e2e.ts
  import './exception';
  ```

<br>

## Links
- link(`<a>`)를 테스트하는 방식은 두가지가 있다. link가 새 `target: _blank`인 경우 클릭시 새창을 열게 되는데, Cypress는 [multiple browser tab을 지원하지 않기 때문](https://docs.cypress.io/guides/references/trade-offs#Permanent-trade-offs-1)에 그냥은 테스트가 어렵다. 이건 `cy.invoke()`를 이용해 `target: _blank`를 지우고 테스트할 수 있다.(혹은 그냥 tag의 attribute값들만 잘 있는지 테스트)
  ```ts
  // a tag 에서 target attribute를 지운뒤 클릭
  cy.get('#simpleLink').invoke('removeAttr', 'target').click();
  ```
1. 클릭후 다른 페이지로 이동
- [`cy.url()`](https://docs.cypress.io/api/commands/url)로 적절한 url로 이동했는지 테스트한다.(해당 페이지에서 redirect가 있는 경우 어떻게 될지..?)

<br>

2. 페이지 이동도 결국 http request를 날리는것이다. 이를 테스트한다.
- [`cy.intercept()`](https://docs.cypress.io/api/commands/intercept)를 이용하면 http request를 intercept할 수 있다. stub / spy 가 가능한데, spy한 후 실제 응답을 대략적으로 테스트하면 된다.
- 이 방식은 사용자의 액션에 의해 발생하는 ajax 요청을 테스트 하는 방식과 동일하다.

<br>



## Cypress Dashboard
- cypress에서 제공하는 dashboard에서 테스트 결과를 확인할 수 있다.
- `organization`과 `project`를 만들고 나면 `project id`가 생기고 `key`가 생긴다. `cypress.config.ts`에 `projectId`를 설정하고, `cypress run`에 key를 전달해주면 실행한 테스트 결과를 dashboard에서 확인할 수 있다.

<br>

## Cypress + Github Action (5 nodes Parallel execution)
- 테스트를 [`Github Action`](https://docs.github.com/en/actions)에서 실행할 수도 있다. Github Action은 [github에서 제공하는 CI/CD 플랫폼](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#overview)으로 jenkins같은거라고 생각하면 편할 것 같다.
- [workflow](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#overview) 라고 하는 자동화 된 작업을 `.github/workflows`에 `yaml`로 정의하면 된다. 작성 방법은 [`cypress-io/github-action`](https://github.com/cypress-io/github-action)의 가이드를 참고하면 된다.

> 회사 깃은 action이 없다.. 아마 hooks를 이용해서 직접 서버에서 테스트 돌아가도록 구현해야 할 듯

- 테스트가 많아지면 실행 시간도 길어진다. 여러개의 컨테이너를 이용해서 테스트를 실행하는 [`parallel execution`](https://docs.cypress.io/guides/guides/parallelization)도 가능하다. 이건 cypress를 특정 서비스에 integration 하면서 `cypress-io`패키지를 써서 가능한 부분인 것 같다. 

<br>

