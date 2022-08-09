---
title: >-
  解決unable to access https://github.com/xxx/xxx.github.io.git/: The requested
  URL returned error: 403問題
date: 2021-08-15 11:17:50
tags:
  - frontend
  - git
categories: frontend
---

2021/08/15

今天一早起來想說來更新一下我的 Blog，誰知道在我按下 hexo d 的那一刻，居然跳出錯誤:

```js
unable to access 'https://github.com/janlin002/janlin002.github.io.git/': The requested URL returned error: 403
// 我的Github是janlin002，所以中間才會顯示janlin002
```

當下想說：不會吧！又來？只好硬著頭皮來解決了...

我一共找到三個解決方法，但我真正能解決的是第三個，也許你用第一或第二個方法就可以解決也說不定

- 首先是修改\_config.yml 檔案,的 repo 值，改成：

```js
repo: https://使用者名稱:github密碼@github.com/janlin002/janlin002.github.io
ex. https://janlin002:github密碼@github.com/janlin002/janlin002.github.io
```

但沒有效果，可能是[文章](https://www.itread01.com/content/1544833994.html)有點年代了(2018)，只好換另一種方式

- 使用 Travis CI

> Travis CI 是在軟體開發領域中的一個線上的，分散式的持續整合服務，用來構建及測試在 GitHub 代管的代碼。這個軟體的代碼同時也是開源的，可以在 GitHub 上下載到，儘管開發者當前並不推薦在閉源專案中單獨使用它。

上面是維基百科的介紹，聰明的你，一定看出我想使用 SSH 來上傳，這樣一來，就跟前面的文章一樣的解法，不過仔細想想如果只是想更改為 SSH 沒必要使用到 Travis CI，所以就有第三種解法了

至於 Travis CI 的操作這邊不多做著墨，以下提供幾的資源給大家參考:

[官方網站](https://hexo.io/zh-tw/docs/github-pages.html) // 如果覺得看不太懂沒關係，我們都一樣...

[Ray IT 鐵人幫](https://ithelp.ithome.com.tw/articles/10251088) // 推

另外私心推薦 Ray 的[鐵人幫文章](https://ithelp.ithome.com.tw/users/20119486/ironman/2944)，真的很仔細!!

- 第三種方式是直接更改為 SSH 部署方式

首先先進入到你自己 github 的專案頁面，並且點選 code

<!-- ![image1](https://i.ibb.co/0D2YJsS/2021-08-15-12-06-04.png?10001000) -->

<img src="https://i.ibb.co/0D2YJsS/2021-08-15-12-06-04.png" width=800 height=400 />

並且把 SSH 的的網址全部複製，貼到 repo 的位置

![image2](https://i.ibb.co/SBq4WVP/2021-08-15-12-09-49.png)

[六角學院](https://ithelp.ithome.com.tw/articles/10208581)

接著重新部署一次，就可以嘍

```js
hexo g
hexo d
```
