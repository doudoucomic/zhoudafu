import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import img_1 from '@/img/xmly/1.png'
import img_2 from '@/img/xmly/2.png'
import img_kc from '@/img/xmly/kc.png'
import img_qr from '@/img/xmly/qr.jpeg'
import './index.css'

class Index extends Component {

  config = {
    navigationBarTitleText: '课程介绍'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick() {
    // Taro.setClipboardData({
    //   data: 'https://m.qlchat.com/wechat/page/live/2000005096362787',
    //   success (res) {
    //     Taro.showModal({
    //       title: '课程链接已复制',
    //       showCancel: false,
    //       content: '请通过浏览器打开查看',
    //     })
    //   }
    // })
    this.setState({
      showQr: true
    })
  }
  handleClickLapiao() {
    Taro.navigateBack({
      delta: 1
    })
  }
  handleHideQr() {
    this.setState({
      showQr: false
    })
  }
  downloadPhoto(filePath) {
    Taro.saveImageToPhotosAlbum({
      filePath,
      success: res => {
        console.log(res)
        Taro.showToast({
          title: '图片保存成功'
        })
      }
    })
    console.log(e, e.currentTarget)
  }
  render () {
    const { showQr } = this.state
    return (
      <View className='index' style='background: #7ccce6;height:100%; padding-top: 45px;'>
        <View style='position: relative'>
          <Image src={ img_1 } style='width: 100%; display: flex' mode='widthFix' />
          <Image src={ img_kc } style='width: calc(100% - 36px); margin: 18px; position: absolute; top: 0; left: 0; display: flex' mode='widthFix' />
        </View>
        <View style='position: relative'>
          <Image src={ img_2 } style='width: 100%; display: flex' mode='widthFix'  />
          <View style='position: absolute; width: 100%; height: 100%; top:0;left:0'>
            <View className='dec_btn' style='width:200px;height:50px;left:80px; position:relative;' onClick={ this.handleClick.bind(this) }></View>
            <View className='dec_btn' style='width:200px;height:50px;left:80px; position:relative; top: 20px' onClick={ this.handleClickLapiao.bind(this) }></View>
          </View>
        </View>
        {
          showQr && (
            <View id='wrapper' style='position: absolute; height: 100%; width: 100%; top: 0; left: 0'>
              <View style='position: absolute; height: 100%; width: 100%; top: 0; left: 0; z-index: 1; background: rgba(0,0,0,0.8)' onClick={ this.handleHideQr.bind(this) }></View>
              <View style='position: absolute; z-index: 99; top: 0; left: 0; width: 100%; '>
                <View style='padding:10px;background:#fff;width:200px;height:200px;position:relative;left:calc(50% - 110px);margin-top:30%;margin-bottom:20px;'>
                  <Image  onLongPress={ () => this.downloadPhoto(img_qr) } src={ img_qr } style='width: 200px; display: flex' mode='widthFix' />
                </View>
                <View style='text-align:center; color:#fff; font-size:16px; ' onClick={ this.handleHideRule.bind(this) }>
                  长按保存二维码图片，并识别二维码查看课程
                </View>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

export default Index
