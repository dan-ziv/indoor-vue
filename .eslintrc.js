module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    google: true,
    firebase: true
  },
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", 'plugin:vue/essential'],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  rules: {}
};
