import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.css'
import img_1 from '@/img/page3/1.png'
import img_2 from '@/img/page3/2.png'
import img_3 from '@/img/page3/3.png'
import img_4 from '@/img/page3/4.png'
import img_5 from '@/img/page3/5_v.png'
import img_v from '@/img/page3/v.png'
import img_pic from '@/img/page3/pic.png'


class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }
  componentDidMount() {
    console.log('我是新版本：测试一下scene')
    console.log(this.$router.params)
    const { scene } = this.$router.params

    console.log(scene)
    const uid = decodeURIComponent(scene).split('=')[1]

    console.log(uid)
    Taro.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          Taro.request({
            url: 'https://czd.goheadline.cn/api/code2session',
            method: 'POST',
            data: {
              code: res.code,
            },
            success: res => {
              const { data } = res
              if (data) {
                const { wx_user } = data
                const { openid, id } = wx_user
                if (id == uid) {
                  Taro.navigateTo({
                    url: '../center/index'
                  })
                  return
                }
                Taro.request({
                  url: `https://czd.goheadline.cn/api/apprentices/${ uid }`,
                  header: {
                    'access_token': openid
                  },
                  success: res => {

                    const { data } = res
                    const { apprentice } = data
                    console.log(apprentice)
                    Taro.setStorageSync('userInfo', {
                      id,
                      openid,
                    })
                    this.setState({
                      id,
                      openid,
                      uid,
                      apprentice
                    })
                    Taro.setNavigationBarTitle({
                      title: `${ apprentice.nick }的丝路任我行`
                    })
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // console.log(userInfo)

  }
  handleClick() {
    Taro.navigateTo({
      url: '../info-completion/index'
    })
  }
  handleToupiaoClick() {
    const { openid, uid } = this.state
    Taro.request({
      url: `https://czd.goheadline.cn/api/apprentices/${ uid }/vote`,
      method: 'POST',
      header: {
        'access_token': openid
      },
      success: res => {
        const { data } = res
        // console.log(data)
        const { success, ticket_left } = data
        let title = '投票成功'
        const content = `剩余投票次数：${ ticket_left || 0 }次`
        if (success === false) {
          title = '投票失败'
        }
        Taro.showModal({
          title,
          content,
          showCancel: false,
        })
      }
    })
    // Taro.showModal({
    //   title: '提醒',
    //   content: '这里要弹出一张图',
    // })
  }
  handlePaimingClick() {
    Taro.navigateTo({
      url: '../list/tab/index'
    })
  }
  handleJoinClick() {
    Taro.navigateTo({
      url: '../index/index'
    })
  }
  handleVideoPlay() {

    const videoContext = Taro.createVideoContext('myVideo')

    videoContext.play()
    videoContext.requestFullScreen()

  }
  render () {
    const { apprentice = {} } = this.state
    const { name, nick, went = '闵行区，普陀区、嘉定区', slogan,
            img_url = 'http://puir34i0r.bkt.clouddn.com/FuUVeGa1gp0nZFicH0HJHLNK6kmi',
            img_url2 = '', img_url3 = '',
            video_url = 'http://puir34i0r.bkt.clouddn.com/FtMzgQdNgOoVkobVQeV1RZvuVk9-', } = apprentice

    console.log(apprentice)
    return (
      <View className='index' style='background: #7ccce6;height:100%; padding-top: 20px;'>
        <View style='position: relative; '>
          <View className='flex flex-justify-between flex-align-center' style='width: 100%; padding: 15px 30px; box-sizing: border-box;'>
            <Text style='font-size: 16px; color: #0E3C53;'>{ nick || name }</Text>
            {
              video_url && (
                <View>
                  <Image onClick={ this.handleVideoPlay.bind(this) } src={ img_v } style='width: 100px; display: flex' mode='widthFix'  />
                  <Video
                    src={ video_url }
                    controls={true}
                    autoplay={false}
                    poster={ img_v }
                    initialTime='0'
                    id='myVideo'
                    loop={false}
                    muted={false}
                    style='width: 1px; height: 1px; position: absolute; top: 0; left: 0 '
                  />
                </View>
              )
            }
          </View>
        </View>
        <View style='position: relative'>
          <Image src={ img_2 } style='width: 100%; display: flex' mode='widthFix'  />
          <View style='position: absolute; top: 42px; left: 33px;font-size: 12px; color: #0E3C53; width:80%'>{ slogan }</View>
        </View>
        <View style='position: relative'>
          <Image src={ img_3 } style='width: 100%; display: flex' mode='widthFix' />
          <View style={ ` overflow: scroll;height:36px;position: absolute; top: 42px; left: 33px;font-size: 12px; color: #0E3C53; width:80%` }>{ went }</View>
        </View>
        <View style='position: relative' >
          <Image src={ img_4 } style='width: 100%; display: flex' mode='widthFix' />
          <View className='flex flex-justify-between flex-align-center' style='position: absolute; top: 20px; width:100%;padding:0 30px;box-sizing:border-box;'>
            <View style='padding: 5px; background: #fff;'>
              <Image src={ `${ img_url }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>
            <View style='padding: 5px; background: #fff;'>
              <Image src={ `${ img_url2 }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>
            <View style='padding: 5px; background: #fff; '>
              <Image src={ `${ img_url3 }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>
          </View>
        </View>
        <View style='position: relative'>
          <Image src={ img_5 } style='width: 100%; display: flex' mode='widthFix' />

          <View className='flex flex-justify-around flex-align-center' style='position: absolute; width: 100%; height: 100%; top:0;left:0'>
            <View className='dec_btn' onClick={ this.handleToupiaoClick.bind(this) }></View>
            <View className='dec_btn' onClick={ this.handleJoinClick.bind(this) }></View>
            <View className='dec_btn' onClick={ this.handlePaimingClick.bind(this) }></View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
