---
title: 關於如何調用redux的state
date: 2021-08-19 19:52:28
tags:
---

Hello 各位，由於前面發了多廢文，所以這篇希望可以有點深度，<del>我很深，你忍一下</del>

這篇會介紹的幾種調用 redux state 的方式，都是工作上遇到的，算是長了知識，網路上也許會有相關教學，但這邊會以初學者的角度跟大家分享(因為我也是初學者，嗚嗚嗚)

## 首先：什麼是 Redux

> **_Redux 一個用於應用程式狀態管理的開源 JavaScript 庫。Redux 經常與 React 搭配運用，但其也可以獨立使用。 - 取自維基百科_**

是我的話，我會說是一個可以讓你把特殊資料全域的方法

因為有了 redux 我們不用再在各個 Component 中傳遞 Props，當然除了 redux 還是有別的方法做資料的存儲，不過不是這篇的重點，所以這邊先跳過

## 感覺很好用欸，那要怎麼用？

在進入 redux 之前，你必須要知道 redux 三巨頭，<del>就跟 NBA 一樣一定會有三巨頭</del>，分別是：action, store, reducer，什麼鬼？行動商店減速器？<del>感覺很有商機欸</del>，先別急嘛...這邊我先講一下各自所做的事，再搭配圖片你一定會更加了解！

題外話：很多人在學 redux 都喜歡使用圖書館的例子，不過像我們這種不喜歡讀書才來當工程師的人來說一點說服力都沒有啊...

警告：這邊會有點黃色成份，所以覺得不適的話可以先跳到圖片部分

在故事開始前我先訂一些角色，方便我構思我的故事：

- 客人
- 櫃檯阿姨
- 小姐(小美)

故事開始：

首先你(客人)今天被老闆到處刁難，想說下班去找小美，順便聊聊今天遇到的不快，不過今天剛好星期五所以人很多，櫃檯阿姨只好拿出紙筆，讓大家寫下希望找的小姐姓名，輪到你時，<u>你把手上寫著小美名字的卡片給了櫃檯阿姨(action)</u>，這時阿姨會<u>去後台看看今天小美有沒有來上班(store)</u>，<u>最後小美給了你封信，說今天身體不舒服，想早點休息(reducer)</u>

來！故事結束了。你是不是想看什麼特殊劇情？沒有！我們是來學習 redux 的

各位老司機，是不是了解 redux 的流程了？簡單來說，會使用 action 做觸發事件的動作，並且透過 store 傳遞給 reducer 你所傳遞過去的資料(卡片)，並且待 reducer 處理完資料後回傳給你新的 state

![image](https://miro.medium.com/max/1400/0*3hs469HtpO172mmc.png)

上圖是我覺得做得很好的流程圖，試著把上面的字改成故事裡面的角色，相信就會比較了解

## 講完 redux 了，那 redux 的 state 呢？

關於 redux 的 state 有很多種調用方式，先說一下為什麼需要調用 redux 的 state?

就好像，今天小美其實寫好卡片了。但因為沒有人幫忙傳遞，所以你一直在外面乾等，眼巴巴看著你朋友幸福洋溢的走出來，相信你不會想經歷的...

等一下的程式碼會專注於有改變得部分，如果沒貼代表跟最上面一樣

且路徑是視自己專案而定，不然會沒效果

### 基礎 redux 環境

// termianl

```bash
npm install --save redux
npm install react-redux --save
```

// action.js

```js
export const BUTTON_CLICK = 'BUTTON_CLICK'

export const buttonClick = (payload) => {
  return {
    type: BUTTON_CLICK,
    payload: value,
  }
}
```

// store.js

```js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
export default store
```

// reducer.js

```js
const defaultState = {
    name: 'jan' // 初始資料
}

const reducer (state = defaultState,action)=>{
    switch (action.type) {
        case BUTTON_CLICK:
            const name = state.name;
            const value = action.payload;
            return {...state, name: value}
            break;
        default: // 一定要寫
            return state
            break;
    }
}

export default reducer;

```

// App.js - 調用頁面 (一律使用 useDispatch()打 action)

```js
import React from 'react'
import { useDispatch } from 'react-redux'
import { BUTTON_CLICK } from '../src/redux/action'

function App() {
  const dispatch = useDispatch()
  const buttonClick = () => {
    dispatch({ type: BUTTON_CLICK, payload: 'bill' })
  }
  return (
    <div>
      <button onClick={() => buttonClick()}>取的reducer</button>
    </div>
  )
}

export default App
```

// index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './src/store'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    {/* 將store作為props傳遞給其他component */}
    <App />
  </Provider>,
  document.getElementById('app')
)
```

### 使用 react-redux 的 mapStatetoProps (class component)

- 使用 mapStateToProps 不過 Hooks 的 useSelector 出現後，就被代替了

- 可以省略 constructor 裡面的 this.state = store.getState()

- 把 name 當作 props 來做傳遞

// App.js

```js
import React from 'react'
import { connect } from 'react-redux'

class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
})

const MapState = connect(mapStateToProps)(Map)

export default MapState
```

### 使用 react-redux 的 useSelector (Hooks)

- 這邊直接用 useSelector 抓取 state 裡面的 name，寫法更為直觀

```js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BUTTON_CLICK } from '../src/redux/actionType'

function App() {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.name)
  const buttonClick = () => {
    dispatch({ type: BUTTON_CLICK, payload: 'bill' })
  }
  return (
    <div>
      <button onClick={() => buttonClick()}>取的reducer</button>
      <h1>{name}</h1>
    </div>
  )
}

export default App
```

以上就是基本的 redux state 調用方法，現在基本上都用第二種了，除非你的專案還沒導入 Hooks

下一篇可能會寫 react-intl 或是 formik&yup，還不確定

那就到時候見拉
