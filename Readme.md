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