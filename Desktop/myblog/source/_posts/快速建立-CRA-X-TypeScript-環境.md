---
title: 快速建立 CRA X TypeScript 環境
date: 2021-08-17 13:45:42
tags:
---

### 1. 使用官方提供的方法

```js
npx create-react-app my-app --template typescript
```

### 2. 想把舊專案升級成 Typescript

```js
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

這時候所有檔名還是 Js 檔，所以需手動更改為 Ts 檔，並修改錯誤
