import Taro, { Component } from '@tarojs/taro'
import { View, Button, Map, CoverView } from '@tarojs/components'
import './index.css'
import mockData from './mock'
class App extends Component {
  static options = {
    addGlobalClass: true
  }
  config = {

  }
  state = {
    list: mockData
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillUnmount () { }
  componentDidShow () {}
  componentDidHide () { }
  handleClick(name) {}
  handleToupiaoClick(id) {
    Taro.navigateTo({
      url: `../../vote/index?scene=${ encodeURIComponent(`uid=${ id }`) }`
    })
  }
  render () {
    const { ranking: list = [] } = this.props
    console.log(list)
    return (
      <ScrollView
        scrollY
        style='height: 100%; width: calc(100% - 30px); box-sizing: border-box; padding: 9px 11px; margin: 0 15px; background: rgba(255,255,255,.5); border-radius: 5px; '>
        {
          list.map((o, i) => {
            const { nick, name, avatar, rank, ticket_received, id } = o
            const listCount = rank
            return (
              <View onClick={ () => this.handleToupiaoClick(id) } className='flex flex-justify-between flex-align-center' style='padding: 10px 8px; border-bottom: 2px dashed #53A1BA' >
                <View className='flex flex-justify-start flex-align-center' style='font-size: 14px; color: #104C5F'>
                  <Text>{ listCount < 10 ? `0${ listCount }` : listCount }</Text>
                  <View  style='width: 45px; height: 45px; border-radius: 100%; background: #fff; margin: 0 20px;'>
                    {
                      avatar && (
                        <Image src={ avatar } style='width: 100%; display: flex; border-radius: 100%' mode='widthFix' />
                      )
                    }
                  </View>
                  <Text>{ nick }</Text>
                </View>
                <Text style='color: #104C5F; font-size:14px'>
                  <Text style='color: #9B143B'>{ ticket_received }</Text> 票
                </Text>
              </View>
            )

          })
        }
      </ScrollView>
    )
  }
}

export default App

// 31.277574,121.336752
