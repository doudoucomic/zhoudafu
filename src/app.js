import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import configStore from './store'

import './app.css'
import './lib/common.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/info-completion/index',
      'pages/center/index',
      'pages/ting/index',
      'pages/list/tab/index',
      'pages/vote/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#9b143b'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
			<Provider store={store}>	
        <Index />
			</Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
