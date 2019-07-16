import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import img_1 from '@/img/page1/1.png'
import img_2 from '@/img/page1/2.png'
import img_3 from '@/img/page1/3.png'
import img_4 from '@/img/page1/4.png'
import img_5 from '@/img/page1/5.png'
import img_6 from '@/img/page1/6.png'
import img_c from '@/img/page1/c.png'
import './index.css'

class Index extends Component {

    config = {
    navigationBarTitleText: '首页',
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick(e) {
    console.log(e)
    const { detail } = e
    const { userInfo } = detail
    const { nickName, avatarUrl } = userInfo
    Taro.login({
      success (res) {
        if (res.code) {
          console.log(res.code)
          Taro.request({
            url: 'https://czd.goheadline.cn/api/code2session',
            method: 'POST',
            data: {
              code: res.code,
              nickName,
              avatarUrl
            },
            success: res => {
              const { data } = res
              if (data) {
                const { wx_user, is_apprentice } = data
                const { openid, id } = wx_user
                Taro.setStorageSync('userInfo', {
                  id,
                  openid,
                  nickName,
                  avatarUrl
                })
                Taro.navigateTo({
                  url: is_apprentice ? '../center/index' : '../info-completion/index',
                  // url: '../center/index'
                })
              }

            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  handleShowRule() {
    this.setState({
      showRule: true
    })
  }
  handleHideRule() {
    this.setState({
      showRule: false
    })
  }
  handleToList() {
    console.log(123)
    Taro.navigateTo({
      url: '../list/tab/index'
    })
  }
  render () {
    const { showRule } = this.state
    let mainStyle = 'background: #7ccce6;height:100%;'
    if (showRule) {
      mainStyle += 'overflow: hidden;'
    }
    return (
      <View className='index' style={mainStyle}>
        <View>
          <Image src={ img_1 } style='width: 100%; display: flex' mode='widthFix' />
          <Image src={ img_c } style='width: 50px; position: absolute; right: 8px; top: 68px' mode='widthFix' />
        </View>
        <Image src={ img_2 } style='width: 100%; display: flex' mode='widthFix' />
        <Image src={ img_3 } style='width: 100%; display: flex' mode='widthFix' />
        <Image src={ img_4 } style='width: 100%; display: flex' mode='widthFix' />
        <View style='position: relative'>
          <Image src={ img_5 } style='width: 100%; display: flex' mode='widthFix' />
          <View  onClick={ this.handleShowRule.bind(this) }style='position: absolute; height: 40px; width: 210px; top: 0; left: calc(50% - 105px);background:transparent'></View>
        </View>
        <View style='position: relative'>
          <Image src={ img_6 } style='width: 100%; display: flex' mode='widthFix' />
          <Button open-type='getUserInfo' onGetUserInfo={ this.handleClick.bind(this) }
          style='position:absolute;height:40px;width:101px;top:0;left:50px;background:transparent;'>
            <View></View>
          </Button>
          <Button onClick={ this.handleToList.bind(this) }
            style='position:absolute;height:40px;width:101px;top:0;right:50px;background:transparent;'>
            <View></View>
          </Button>
        </View>
        {
          showRule && (
            <View id='wrapper' style='position: absolute; height: 100%; width: 100%; top: 0; left: 0'>
              <View style='position: absolute; height: 100%; width: 100%; top: 0; left: 0; z-index: 1; background: rgba(0,0,0,0.6)' onClick={ this.handleHideRule.bind(this) }></View>
              <View style='position: absolute; z-index: 99; top: 0; left: 0; width: 100%; '>
                <ScrollView scrollY style='margin-left: 5%; width: 90%; box-sizing: border-box; background: rgba(255,255,255,.9);height:500px;overflow:scroll;border-radius:10px;margin-top:15%;'>
                  <Image src='https://cdn.family123.info/page/rule.png?v=0.2' style='width: 100%; display: flex' mode='widthFix' />
                </ScrollView>
                <View style='background:#9b143b;margin:20px auto;width:100px;text-align:center;height:40px;line-height:40px;border-radius:40px;color:#fff;font-size:18px; ' onClick={ this.handleHideRule.bind(this) }>确认</View>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

export default Index
