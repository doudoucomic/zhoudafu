import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Video, Canvas } from '@tarojs/components'
import html2canvas from '@/lib/wxml2canvas'
import './index.css'
import img_1 from '@/img/page3/1.png'
import img_2 from '@/img/page3/2.png'
import img_3 from '@/img/page3/3.png'
import img_4 from '@/img/page3/4.png'
import img_5 from '@/img/page3/5.png'
import img_pic from '@/img/page3/pic.png'

import img_v from '@/img/page3/v.png'
import img_mingpian_bg from '@/img/mingpian.png'
import img_copy from '@/img/changan.png'
import img_ma from '@/img/ma.jpg'
class Index extends Component {

  config = {
    navigationBarTitleText: '个人信息'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  componentDidMount() {
    const userInfo = Taro.getStorageSync('userInfo')
    this.setState({
      userInfo,
      nickName: userInfo.nickName
    })
    const { openid } = userInfo
    // console.log(userInfo)
    Taro.request({
      url: 'https://czd.goheadline.cn/api/apprentices/my',
      header: {
        'access_token': openid
      },
      success: res => {
        const { data } = res
        const { apprentice } = data
        const { qr_code_url } = apprentice
        this.setState({
          apprentice
        }, () => {
          Taro.downloadFile({
            url: `${ qr_code_url }?imageView2/2/w/224/h/224/q/100`,
            success: res => {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                this.setState({
                  qr_code: res.tempFilePath
                })
              }
            }
          })
        })
      }
    })
  }
  // fetchQr() {
  //   const { userInfo, apprentice } = this.state
  //   const { openid } = userInfo
  //   const { id } = apprentice
  //   Taro.request({
  //     url: `https://czd.goheadline.cn/api/apprentices/${ id }/qr_code`,
  //     header: {
  //       'access_token': openid
  //     },
  //     success: res => {
  //       const { data } = res
  //       if (data) {
  //         this.setState({
  //           qr_code: data
  //         })
  //       }
  //       console.log(res)
  //     }
  //   })
  // }
  handleClick() {
    Taro.navigateTo({
      url: '../info-completion/index'
    })
  }
  handleHideMingpian() {
    this.setState({
      mingpianShow: false
    })
  }
  handleLapiaoClick() {
    this.setState({
      mingpianShow: true
    }, () => {
      const { isGenerated = false } = this.state
      if (isGenerated) return
      Taro.showLoading({
        title: '生成名片中...'
      })
      const { apprentice = {}, mingpianShow = false, qr_code } = this.state
      const { name, nick, went, slogan,
              img_url,
              video_url, } = apprentice
			
			
			let nameNick = '昵称：'+nick
			let n=0;
			let arr=[];
			let newWent = ''
			while(apprentice.went.indexOf('，',n) != -1){
					var m=apprentice.went.indexOf('，',n);
					n=m+1;
					arr.push(m);
			}
			if(arr.length>9){
				newWent = apprentice.went.substring(0,arr[9]) +'...'
			}else{
				newWent = apprentice.went
			}
      Taro.downloadFile({
        url: `${ img_url }&imageView2/2/w/224/h/224/q/100`,
        success: res => {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {

            const { windowWidth, windowHeight } = res
            const ctx = Taro.createCanvasContext('canvas-map', this)
            // console.log(img_mingpian_bg.width, img_mingpian_bg.height, img_mingpian_bg)
            ctx.drawImage(img_mingpian_bg, 0, 0, 363, 432)
            // ctx.draw(true)
            ctx.drawImage(res.tempFilePath, 36, 160, 100, 100)

            ctx.setFontSize(14);
            ctx.fillStyle = "#104C5F";
            ctx.fillText(nameNick, 159, 173)
            ctx.setFontSize(12);
            ctx.fillText('我的宣言：', 159, 195)
            ctx.setFontSize(12);
            this.drawText(ctx, slogan, 159, 210, 150, 170)
            // ctx.fillText(slogan, 159, 195, 200)
            ctx.setFontSize(12);
            ctx.fillText('我旅游过的城市：', 159, 245)
            ctx.setFontSize(12);
            ctx.fillText(newWent, 159, 260, 200)
            ctx.drawImage(qr_code, 44, 273, 64, 64)
            // ctx.drawImage(img_ma, 44, 272, 64, 64)
            ctx.draw(false, () => {
              Taro.canvasToTempFilePath({
                  canvasId: 'canvas-map',
                  success: (res) => {
                    console.log('canvasToTempFilePath： ', res);
                    Taro.hideLoading()
                    this.setState({
                      isGenerated: true,
                      niubi_img: res.tempFilePath
                    })
                  }
              })
            })
          }
        }
      })


      // Taro.canvasToTempFilePath({
      //   canvasId: 'canvas-map',
      //   quality: 1,
      //   success(res) {
      //     console.log(res.tempFilePath)
      //   }
      // })
    })
  }

  drawText (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      let lw = 0
      let lastSubStrIndex = 0 //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
          lw += ctx.measureText(str[i]).width
          if (lw > canvasWidth) {
              ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight) //绘制截取部分
              initHeight += 15 //22为 文字大小20 + 2
              lw = 0
              lastSubStrIndex = i
              titleHeight += 15
          }
          if (i == str.length - 1) { //绘制剩余部分
              ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight)
          }
      }
      // 标题border-bottom 线距顶部距离
      titleHeight = titleHeight + 10
      return titleHeight
  }
  handlePaimingClick() {
    Taro.navigateTo({
      url: '../list/tab/index'
    })
  }
  handleTingkeClick() {
    Taro.navigateTo({
      url: '../ting/index'
    })
  }

  handleToVote() {
    const { userInfo, apprentice } = this.state
    const { id } = apprentice

    Taro.navigateTo({
      url: `../vote/index?uid=${ id }`
    })
  }
  handleVideoPlay() {

    const videoContext = Taro.createVideoContext('myVideo')

    videoContext.play()
    videoContext.requestFullScreen()

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
  onPreview (current) {
		console.log(current)
    Taro.previewImage({ current, urls: [current] })
  }
  render () {
    const { apprentice = {}, mingpianShow = false, niubi_img } = this.state
    const { name, nick, went = '闵行区，普陀区、嘉定区', slogan,
            img_url = 'http://puir34i0r.bkt.clouddn.com/FuUVeGa1gp0nZFicH0HJHLNK6kmi',
            img_url2 = '', img_url3 = '',
            video_url = 'http://puir34i0r.bkt.clouddn.com/FtMzgQdNgOoVkobVQeV1RZvuVk9-', } = apprentice
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
          <View style='position: absolute; top: 42px; left: 33px;font-size: 12px; color: #0E3C53; width: 80%;'>{ slogan }</View>
        </View>
        <View style='position: relative'>
          <Image src={ img_3 } style='width: 100%; display: flex' mode='widthFix' />
          <View style='position: absolute; top: 42px; left: 33px;font-size: 12px; color: #0E3C53; width: 80%;'>{ went }</View>
        </View>
        <View style='position: relative'>
          <Image src={ img_4 } style='width: 100%; display: flex' mode='widthFix' />
						<View className='flex flex-justify-between flex-align-center' style='position: absolute; top: 5px; width:100%;padding:0 35px;box-sizing:border-box;color: #98264C;font-size:14px;'>个人照片：</View>						
          <View className='flex flex-justify-between flex-align-center' style='position: absolute; top: 30px; width:100%;padding:0 30px;box-sizing:border-box;'>
            <View style='padding: 5px; background: #fff; ' onClick={this.onPreview.bind(this, img_url)}>
              <Image src={ `${ img_url }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>
						{img_url2 &&
            <View style='padding: 5px; background: #fff;' onClick={this.onPreview.bind(this, img_url2)}>
              <Image src={ `${ img_url2 }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>}
						{img_url3 &&
            <View style='padding: 5px; background: #fff; ' onClick={this.onPreview.bind(this, img_url3)}>
              <Image src={ `${ img_url3 }&imageView2/2/w/224/h/224/q/100` } style='max-width:90px;display:flex;max-height:90px;' mode='aspectFit' />
            </View>}
          </View>
        </View>
        <View style='position: relative'>
          <Image src={ img_5 } style='width: 100%; display: flex' mode='widthFix' />
          <View className='flex flex-justify-around flex-align-center' style='position: absolute; width: 100%; height: 100%; top:0;left:0'>
            <View className='dec_btn' onClick={ this.handleLapiaoClick.bind(this) }></View>
            <View className='dec_btn' onClick={ this.handlePaimingClick.bind(this) }></View>
            <View className='dec_btn' onClick={ this.handleTingkeClick.bind(this) }></View>
          </View>
        </View>
        {
          mingpianShow && (
            <View id='wrapper' style='position: absolute; height: 100%; width: 100%; top: 0; left: 0'>
              <View style='position: absolute; height: 100%; width: 100%; top: 0; left: 0; z-index: 1; background: rgba(0,0,0,0.6)' onClick={ this.handleHideMingpian.bind(this) }></View>
              <View style='position: absolute; z-index: 99; top: 0; left: 0; width: 100%; '>
                {
                  niubi_img ? (
                    <Image onLongPress={ () => this.downloadPhoto(niubi_img) } src={ niubi_img } mode='widthFix' style='width:100%; display: flex' />
                  ) : (
                    <Canvas canvasId="canvas-map" style='width: 363px; height: 432px; position: relative'></Canvas>
                  )
                }
                <View>
                  <Image src={ img_copy } style='width: 60%; display: flex; position: relative; left: 20%' mode='widthFix' />
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

// <View style='position: relative'>
//   <Image src={ img_mingpian_bg } style='width: 100%; display: flex' mode='widthFix' />
//   <View className='flex flex-justify-start flex-justify-center' style='position:absolute;top:305rpx;left:72rpx;'>
//     <View style='padding: 5px; background: #fff'>
//       <Image src={ img_url } style='width:112px;display:flex;height:112px; display: flex' mode='scaleToFill' />
//     </View>
//
//     <View style='margin-left: 11px; font-size:14px;color:rgba(14,60,83,1);'>
//       <View style='font-weight:bold;margin-bottom: 5px'>{ name }</View>
//       <View style='font-weight:bold;'>我的宣言：</View>
//       <View style='margin-bottom: 15px'>{ slogan }</View>
//       <View style='font-weight:bold;'>我旅游过的城市有</View>
//       <View>{ went }</View>
//     </View>
//   </View>
//   <View style='position: absolute; top:574rpx;left:88rpx; '>
//     <Image src={ img_ma } style='width:64px;display:flex;height:64px; display: flex' mode='scaleToFill' />
//   </View>
// </View>
