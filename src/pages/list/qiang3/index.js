import Taro, { Component } from '@tarojs/taro'
import { View, Button, Map, CoverView } from '@tarojs/components'
import './index.css'
import img_1 from '@/img/paiming/no1.png'
import img_2 from '@/img/paiming/no2.png'
import img_3 from '@/img/paiming/no3.png'
class App extends Component {
  static options = {
    addGlobalClass: true
  }
  config = {

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
    const rank1 = list[0]
    const rank2 = list[1]
    const rank3 = list[2]

    return (
      <View style='height: 250px; margin: 0 15px; background: rgba(255,255,255,.5); border-radius: 5px; '>
        <View className='flex flex-justify-between flex-align-center' style='padding: 13px 9px;'>
          <View onClick={ () => this.handleToupiaoClick(rank2.id) } style='margin-top: 46px; position: relative; width: 97px; height: 126px'>
            <View style='background: #fff; width: 66px; height: 66px; border-radius: 100%; position: relative; top: 12px; left: calc(50% - 33px); z-index: 1'>
              {
                rank2.avatar && (
                  <Image src={ rank2.avatar } style='width: 100%; display: flex; border-radius: 100%' mode='widthFix' />
                )
              }
            </View>
            <Image src={ img_2 } style='width: 97px; height: 91px; display: flex; z-index: 99; position:absolute; top: 0; left: 0' mode='widthFix' />
            <View style='margin-top: 35px; text-align: center; color: #104C5F; font-size: 12px'>
              { rank2.name }
            </View>
            <View style='margin-top: 8px; text-align: center; color: #104C5F; font-size:12px'>
              <Text style='color: #9B143B'>{ rank2.ticket_received }</Text> 票
            </View>
          </View>

          <View onClick={ () => this.handleToupiaoClick(rank1.id) } style=' position: relative; width: 123px; height: 160px'>
            <View style='background: #fff; width: 93px; height: 93px; border-radius: 100%; position: relative; top: 12px; left: calc(50% - 46px); z-index: 1'>
              {
                rank1.avatar && (
                  <Image src={ rank1.avatar } style='width: 100%; display: flex; border-radius: 100%' mode='widthFix' />
                )
              }
            </View>
            <Image src={ img_1 } style='width: 123px; height: 116px; display: flex; z-index: 99; position:absolute; top: 0; left: 0' mode='widthFix' />
            <View style='margin-top: 35px; text-align: center; color: #104C5F; font-size: 12px'>
              { rank1.name }
            </View>
            <View style='margin-top: 8px; text-align: center; color: #104C5F; font-size:12px'>
              <Text style='color: #9B143B'>{ rank1.ticket_received }</Text> 票
            </View>
          </View>

          <View onClick={ () => this.handleToupiaoClick(rank3.id) } style='margin-top: 46px; position: relative; width: 97px; height: 126px'>
            <View style='background: #fff; width: 66px; height: 66px; border-radius: 100%; position: relative; top: 12px; left: calc(50% - 33px); z-index: 1'>
              {
                rank3.avatar && (
                  <Image src={ rank3.avatar } style='width: 100%; display: flex; border-radius: 100%' mode='widthFix' />
                )
              }
            </View>
            <Image src={ img_3 }  style='width: 97px; height: 91px; display: flex; z-index: 99; position:absolute; top: 0; left: 0' mode='widthFix' />
            <View style='margin-top: 35px; text-align: center; color: #104C5F; font-size: 12px'>
              { rank3.name }
            </View>
            <View style='margin-top: 8px; text-align: center; color: #104C5F; font-size:12px'>
              <Text style='color: #9B143B'>{ rank3.ticket_received }</Text> 票
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default App

// 31.277574,121.336752
