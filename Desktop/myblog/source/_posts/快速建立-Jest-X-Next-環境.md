---
title: 快速建立 Jest X Next 環境
date: 2021-08-16 20:11:06
tags:
  - jest
  - next
categories: frontend
---

## 快速建立 Next 專案

```js
npx create-next-app project-name
// project-name 需自己定義
```

## 引入 Jest

### 下載相關套件

```js
npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer -g
or
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

> 這邊因為想要之後可以 import 東西所以才需下載這麼多東西，如果只需使用 node 環境，那只需使用
> ` npm install --save-dev jest`

### 在 package.json 檔中加入 test

```js
"scripts": {
    "test": "jest"
  }
```

### 建立 babel.config.js

```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```
