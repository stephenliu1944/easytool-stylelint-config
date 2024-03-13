# @easytool/stylelint-config
通用stylelint配置文件.

## Install
```sh
yarn add -D @easytool/stylelint-config
```

## Usage
### React 项目
stylelint.config.js
```js
module.exports = {
  extends: ['@easytool/stylelint-config']
}
```

### Vue 项目
stylelint.config.js
```js
module.exports = {
  extends: ['@easytool/stylelint-config/vue']
}
```