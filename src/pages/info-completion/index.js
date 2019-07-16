import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Textarea, Image, Input, Navigator } from '@tarojs/components'
import './index.css'
import uploadImg from '@/img/upload.png'
import submitImg from '@/img/submit.png'

class InfoCompletion extends Component {
  state = {
      selector: ['上海', '北京', '广州', '深圳'],
      selectorChecked: '上海'
    }
  config = {
    navigationBarTitleText: '填写资料'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {}
  componentDidMount() {
    const userInfo = Taro.getStorageSync('userInfo')
    this.setState({
      userInfo,
      nickName: userInfo.nickName
    })
    console.log(userInfo)
    const { openid, id } = userInfo
    Taro.request({
      url: `https://czd.goheadline.cn/api/apprentices/${ id }`,
      method: 'DELETE',
      header: {
        'access_token': openid
      },
      success: res => {
        console.log(res.data)
      }
    })
  }

  componentDidHide () { }
  handleClick() {
    const { name, nickName, astro, age, job, region = [], mobile, email, went, slogan, uploadedImg, uploadedImg2, uploadedImg3, uploadedVideo,
    userInfo } = this.state
    const { openid } = userInfo

    if (!(name && nickName && astro && age && job && region.length > 0 && mobile && email && went && slogan && uploadedImg)) {
      Taro.showToast({
        title: '请输入完整信息',
        icon: 'none'
      })
      return
    }
    Taro.showModal({
        title: '提醒',
        content: '提交此报名信息？',
      }).then(res => {
        const { confirm, cancel } = res
        if (confirm) {

          Taro.showLoading({
            title: '报名中...'
          })
          Taro.request({
            url: 'https://czd.goheadline.cn/api/apprentices',
            method: 'POST',
            header: {
              'access-token': openid
            },
            data: {
              name,
              nick: nickName, astro, age, job, region: region.join(','), mobile, email, went, slogan,
              img_url: uploadedImg,
              img_url2: uploadedImg2 || '',
              img_url3: uploadedImg3 || '',
              video_url: uploadedVideo
            },
            success: res => {
              const { data } = res
              if (data && data.apprentice && data.apprentice.id) {
                Taro.showModal({
                  title: '恭喜',
                  showCancel: false,
                  content: '提交成功',
                }).then(res => {
                  const { confirm } = res
                  if (confirm) {
                    Taro.navigateTo({
                      url: '../center/index'
                    })
                  }
                })
              } else {
                Taro.showToast({
                  icon: 'none',
                  title: '注册异常'
                })
              }
              Taro.hideLoading()
              // console.log(res)
            }
          })
        } else {
          console.log('取消')
          // onCancel && onCancel()
        }
      })
  }
  handleNameChange({ currentTarget }) {
    this.setState({ name: currentTarget.value })
  }
  handleNickNameChnage({ currentTarget }) {
    this.setState({ nickName: currentTarget.value })
  }
  handleAgeChange({ currentTarget }) {
    this.setState({ age: currentTarget.value })
  }
  handleAstroChange({ currentTarget }) {
    this.setState({ astro: currentTarget.value })
  }
  handleJobChange({ currentTarget }) {
    this.setState({ job: currentTarget.value })
  }
  handleMobileChange({ currentTarget }) {
    this.setState({ mobile: currentTarget.value })
  }
  handleEmailChange({ currentTarget }) {
    this.setState({ email: currentTarget.value })
  }
  handleWentChange({ currentTarget }) {
    this.setState({ went: currentTarget.value })
  }
  handleSloganChange({ currentTarget }) {
    this.setState({ slogan: currentTarget.value })
  }
  uploadFile(filePath, cb) {
    const { userInfo } = this.state
    const { openid } = userInfo
    Taro.request({
      url: 'https://czd.goheadline.cn/api/qiniu_token',
      header: {
        access_token: openid
      },
      success: res => {
        const { data } = res
        if (data) {
          const { token } = data
          Taro.showLoading({
            title: '上传中...'
          })
          Taro.uploadFile({
            url: 'https://upload.qiniup.com/', //仅为示例，非真实的接口地址
            filePath,
            name: 'file',
            formData: {
              token,
            },
            success (res){
              const data = res.data
              const { link } = JSON.parse(data)
              Taro.hideLoading()
              cb && cb(link)
            }
          })
        }
      }
    })

  }
  handleUpload() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const { tempFilePaths = [] } = res
        if (tempFilePaths.length > 0) {
          const uploadedImg = res.tempFilePaths[0]

          this.uploadFile(uploadedImg, link => {
            this.setState({
              uploadedImg: link
            })
          })
        }
      }
    })
  }
  handleUpload2() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const { tempFilePaths = [] } = res
        if (tempFilePaths.length > 0) {
          const uploadedImg = res.tempFilePaths[0]

          this.uploadFile(uploadedImg, link => {
            this.setState({
              uploadedImg2: link + '&imageView2/2/w/224/h/224/q/100'
            })
          })
        }
      }
    })
  }
  handleUpload3() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const { tempFilePaths = [] } = res
        if (tempFilePaths.length > 0) {
          const uploadedImg = res.tempFilePaths[0]

          this.uploadFile(uploadedImg, link => {
            this.setState({
              uploadedImg3: link + '&imageView2/2/w/224/h/224/q/100'
            })
          })
        }
      }
    })
  }
  handleUploadVideo() {
    Taro.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: true,
      success: res =>  {
        const { tempFilePath } = res
        console.log(tempFilePath)
        if (tempFilePath.length > 0) {
          const uploadedVideo = tempFilePath
          this.uploadFile(uploadedVideo, link => {
            this.setState({
              uploadedVideo: link
            })
          })
        }
      }
    })
  }
  onChange = e => {
    console.log(e.detail.value)
    this.setState({
      region: e.detail.value
    })
  }
  render () {
    const { name, nickName, astro, age, job, region = [], mobile, email, went, slogan, uploadedImg, uploadedImg2, uploadedImg3, uploadedVideo } = this.state
    // console.log('region', uploadedImg)
    return (
      <View className='index form'>
        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>姓名</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您的姓名' value={ name }
                   onInput={ this.handleNameChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>昵称</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您的昵称' value={ nickName }
                   onInput={ this.handleNickNameChnage.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>年龄</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您的年龄' value={ age }
                   onInput={ this.handleAgeChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>城市</View>
          <View className='list-content text-align-right'>
            <Picker mode='region' onChange={this.onChange.bind(this)}>
              <View className='picker'>
                {
                  region.length > 0
                    ? `${ region[0] }, ${ region[1] }, ${ region[2] }`
                    : <Text style='color: #777'>请选择城市</Text>
                }
              </View>
            </Picker>
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>星座</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您的星座' value={ astro }
                   onInput={ this.handleAstroChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>职业</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入学生或职员' value={ job }
                   onInput={ this.handleJobChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>电话</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入联系电话' value={ mobile } maxLength='11'
                   onInput={ this.handleMobileChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>邮箱</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您的邮箱' value={ email }
                   onInput={ this.handleEmailChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>旅游过的城市</View>
          <View className='list-content text-align-right'>
            <Input className='text-align-right' placeholder='请输入您旅游过的城市' value={ went }
                   onInput={ this.handleWentChange.bind(this) }
            />
          </View>
        </View>

        <View className='list-container flex flex-justify-between flex-align-center'>
          <View className='list-label'>宣言</View>
          <View className='list-content text-align-right'>
            <Textarea className='text-align-left' style='background:#fff;width:200px;height:80px;padding:6px; border: 1px solid #e5e5e6; border-radius: 5px'
                      placeholder='请输入您的宣言'
                      onInput={ this.handleSloganChange.bind(this) } value={ slogan } maxlength='30' />

          </View>
        </View>

        <View className='list-container text-align-left o-hidden' style='border-bottom: 0'>
          <View className='list-label' style='margin-bottom: 12px'>照片</View>
          <View className='flex flex-justify-between flex-align-center' style='height: 120px'>
            <View style='height: 110px; width: 110px; margin-right: 12px' onClick={ this.handleUpload.bind(this) }>
              <Image src={ uploadedImg ? uploadedImg : uploadImg } className='wp100 hp100' mode='aspectFit' />
            </View>
            <View style='height: 110px; width: 110px; margin-right: 12px' onClick={ this.handleUpload2.bind(this) }>
              <Image src={ uploadedImg2 ? uploadedImg2 : uploadImg } className='wp100 hp100' mode='aspectFit' />
            </View>
            <View style='height: 110px; width: 110px' onClick={ this.handleUpload3.bind(this) }>
              <Image src={ uploadedImg3 ? uploadedImg3 : uploadImg } className='wp100 hp100' mode='aspectFit' />
            </View>
          </View>
        </View>
        <View className='list-container text-align-left o-hidden' style='border-bottom: 0'>
          <View className='list-label' style='margin-bottom: 12px'>视频（选填）</View>
          <View className='flex flex-justify-between flex-align-center' style='height: 120px'>
            <View style='height: 110px; width: 110px; font-size:14px' onClick={ this.handleUploadVideo.bind(this) }>
              {
                uploadedVideo ? '已上传' : (
                  <Image src={ uploadImg } className='wp100 hp100' mode='aspectFit' />
                )
              }
            </View>
          </View>
        </View>
        <View className='text-align-center'>
          <View className='btn' onClick={ this.handleClick.bind(this) }>
            <Image src={ submitImg } style='width: 210px; height: 40px' mode='widthFix' />
          </View>
        </View>
      </View>
    )
  }
}

export default InfoCompletion
