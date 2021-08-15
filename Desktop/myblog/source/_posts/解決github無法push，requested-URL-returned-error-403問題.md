---
title: '解決github無法push，requested URL returned error: 403問題'
date: 2021-08-10 20:44:34
tags:
  - frontend
  - git
categories: frontend
---

2021/07/28

先來講一下為什麼會寫這篇文章…

原本今天會跟平常一樣開心的寫筆記，並且開開心心的 push 到 github，最後再開開心心地看著自己的 commit 數增加，畫面看起來更綠油油

但奇怪的事發生了，當我輸入 git push origin master 時，卻跳出錯誤…當下以為是我輸入錯誤，所以也就再輸了一次，不過卻跳出一樣的錯誤，仔細看了一下:

```bash
Password authentication is temporarily disabled as part of a brownout. Please use a personal access token instead.
The requested URL returned error: 403
```

慘了，這什麼鬼？我根本沒遇過這個問題，查了一下網站，各種解法如春雨冒出，看的我眼花撩亂，索性就先重開電腦、更新我的 git，看會不會問題就解決(怎麼會想說重新啟動就能解決呢？哎…)，但發現問題並沒有解決，只好硬著頭皮去找其他方法，(先說一下我的 github 是用 http 方法處理的)

首先我查在 google 上輸入了關鍵字：

```bash
Password authentication is temporarily disabled as part of a brownout. Please use a personal access token instead.
```

結果出來的第一個結果看起來蠻有說服力的，連結，稍微看了一下，卻卻步了，一下要 Creating a personal access token，一下要 Using a Token on the Command Line，看著我頭都昏了，怕一出錯會很麻煩，所以只能找其他方法了…
所以我就再 google 輸入第二行報錯程式碼：

```bash
The requested URL returned error: 403
```

也是稍微看了一下幾篇文章，不過這次卻有不同的發現，我看到很多篇文章都有提到 SSH，但本身對 SSH 並不是很了解，只知道在做 clone 時，會有 http 跟 SSH 兩種方法，官方主要提倡 http 方法所以也就沒有對 SSH 有其他的研究，真正有幫助我解決問題的其實是 Ray 助教的文章(文章發表於 2021–06–30，要是我早了幾天遇到這個問題，可能就無解了…)，文章有提到：

> 會發生這個問題的原因是因為 GitHub 官方在 2020 年 11 月 13 日開始陸續不支援使用帳號密碼的身份認證，也就是 HTTPS 的模式上傳

所以之後可能就會以 SSH 方式為主流，乾脆現在開始學習，至於如何設立 SHH 金鑰，主要是看卡斯柏老師的[技術文章](https://wcc723.github.io/git/2018/02/12/github-ssh-https/)，跟[猴子都能懂的 Git 入門指南](https://backlog.com/git-tutorial/tw/reference/ssh.html)，

程式碼的部分，簡單講一下大概的部分，詳細的部分還請移步到上面兩個網站了…

首先，請在終端機輸入：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

記得要把 email 部分改成你自己的 email，然後一路按 Enter，並且到輸入密碼的地方輸入你希望的金鑰密碼(很重要)

接著輸入:

```bash
eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/id_rsa
```

後面我的步驟跟卡斯柏老師不一樣，我是直接輸入：

```bash
cat ~/.ssh/id_rsa.pub
// 執行上方命令就可以確認產生SSH連線所需要公開金鑰的內容。然後會看到如下的一串亂碼(每個人不一樣)
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDkkJvxyDVh9a+zH1f7ZQq/JEI79dVjDSG
4RzttQwfK+sgWEr0aAgfnxdxQeDKxIxqI1SwyTY8oCcWzvpORuPqwbc7UWWPcCvbQ3jlEdN
5jvwKM82hincEWwI3wzcnVg2Mn8dH86b5m6REDzwRgozQ3lqrgwGVlTvkHDFs6H0b/1PSrM
XGppOP/QXGEVhZ6Hy4m3b1wMjjrbYwmWIeYklgoGHyrldhAaDYc33y7aUcRyFyq5DubtsLn
2oj4K+1q36iviCHxCOri0FDmn2dzylRCI4S+A2/P7Y7rVfdT+8OWYKCBUs8lfjujghEtejq
Qmj9ikyGTEAW1zQCN7hVwYdjL hoge@hoge.local
```

記得需全部複製，不然會沒有效果，最後到 Github 的 Setting，選擇左側選單的

```bash
SHH and GPG keys
```

並建立新的 SHH Keys，把剛剛的金鑰內容貼上即可

不過還沒結束，須回到專案中，使用 SHH 方式 clone 一次舊的專案，再 Push 一次就可以了~~
