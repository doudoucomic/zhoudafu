import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.css'

class Index extends Component {

    config = {
    navigationBarTitleText: '排名'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick() {
    Taro.navigateTo({
      url: '../center/index'
    })
  }
  render () {
    return (
      <View className='index'>
        <View style='margin-bottom: 30px' className='flex flex-justify-around flex-align-center'>
          <View>很多强</View>
          <View>很多强</View>
          <View>很多强</View>
        </View>
        <View style='margin-bottom: 30px' className='flex flex-justify-around flex-align-center'>
          <View>第二名</View>
          <View>第一名</View>
          <View>第三名</View>
        </View>
        <View style='margin-bottom: 30px'>
          <View>第4名</View>
          <View>第5名</View>
          <View>第6名</View>
          <View>第7名</View>
          <View>第8名</View>
          <View>第9名</View>
          <View>第10名</View>
          <View>...</View>
        </View>
        <View style='margin-bottom: 30px' className='flex flex-justify-center flex-align-center'>
          <View>我的排名：999</View>
          <View>我的票数：40</View>
        </View>
        <View className='flex flex-justify-center flex-align-center'>
          <Button className='dec_btn' onClick={ this.handleClick.bind(this) }>返回拉票</Button>
        </View>

      </View>
    )
  }
}

export default Index
