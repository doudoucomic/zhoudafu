import Taro, { Component } from '@tarojs/taro'
import { View, Button, Map, CoverView } from '@tarojs/components'
import carImg from '@/img/car.png'
import bgImg from '@/img/paiming/bg.png'
import img_btn from '@/img/paiming/btn.png'
import './index.css'
import mockData from './mock'
import Qiang3 from '../qiang3'
import Qiang15 from '../qiang15'
import Qiang50 from '../qiang50'
import QiangHai from '../qianghai'

class App extends Component {
  state = {
    tabList: [ {
        name: '海选',
      }, {
        name: '50强',
      }, {
        name: '15强',
      }, {
        name: '3强',
      }
    ],
    currentTab: '3强'
  }
  config = {

  }
  componentWillReceiveProps (nextProps) {
//    console.log(this.props, nextProps)
  }
  componentWillUnmount () { }
  componentDidShow () {
    const { activityName } = this.state
    Taro.setNavigationBarTitle({
      title: '排名'
    })


    if (activityName) {
      this.fetchRank(activityName)
    }

  }
  fetchRank(activityName) {
    const userInfo = Taro.getStorageSync('userInfo')
    const { openid } = userInfo
    Taro.request({
      url: 'https://czd.goheadline.cn/api/apprentices/ranking',
      data: {
        name: activityName
      },
      header: {
        'access_token': openid
      },
      success: res => {
//        console.log(res.data)
        const { data } = res
        const { my, ranking, stat } = data
        if (my && ranking) {
          this.setState({
            currentTab: activityName,
            my,
						stat,
            ranking,
          })
        } else {
          this.setState({
            currentTab: activityName,
            ranking: [],
            my: {
              rank: 0,
              ticket_received: 0
            }
          })
        }
      }
    })
  }
  componentDidMount() {

    const userInfo = Taro.getStorageSync('userInfo')

    const { openid } = userInfo
    Taro.request({
      url: 'https://czd.goheadline.cn/api/activities/current',
      header: {
        'access_token': openid
      },
      success: res => {
//        console.log(res.data)
        const { data } = res
        const { activity } = data
        if (activity && activity.id && activity.name) {
          this.setState({
            activityName: activity.name
          }, () => {
            this.fetchRank(activity.name)
          })

        }
      }
    })
  }
  componentDidHide () { }
  handleClick(name) {
    this.setState({
      currentTab: name,
      activityName: name,
    }, () => {
      this.fetchRank(name)
    })
  }
  handleToCenter() {
    Taro.navigateBack({
      delta: 1
    })
  }
  render () {
    const { currentTab, my = {}, stat = {}, ranking = [],  } = this.state
		console.log('2')
		console.log(my)
		console.log(this.state)
    const { rank = 0, ticket_received = 0 } = my
    return (
      <View style='height: 100%'>
        <View style='height: 44px; line-height: 44px; background: #9b143b; padding: 0 20px; font-size: 14px;box-shadow:0px 10px 20px rgba(0,0,0,0.07);'>
          {
            this.state.tabList.map((o, i) => {
              const isActive = o.name === currentTab
              return (
                <Text key={ o.name } onClick={ () => this.handleClick(o.name) } style={ `position:relative; display:inline-block; width: 25%; text-align: center; color: #fff`}>
                  <Text>{ o.name }</Text>
                  {
                    isActive && <Text style='background-color: #FFFC00; width: 30px; height: 3px; position: absolute; bottom: 0; left: calc(50% - 15px); border-radius: 10px;' ></Text>
                  }
                </Text>
              )
            })
          }
        </View>
        <View style={ `height: calc(100% - 44px);background: url(${ bgImg });background-size:100%;background-position:100% 100%;background-repeat:no-repeat;position:relative;background-color:#7ccce6;` }>
          <View className='flex flex-justify-center flex-align-center' style='margin-bottom: 12px; padding-top: 51px; width: 100%; font-size: 14px; color: #104C5F'>
						{currentTab === '50强' && <View style={ `position:absolute;top:5px;left:20px` }>50强公布时间：2019/7/29 17：00</View> }
						{currentTab !== '50强' && currentTab !== '15强' && currentTab !== '3强' && <View style={ `position:absolute;top:5px;left:20px` }>海选时间：2019/7/15 00：00-2019/7/28 24：00</View> }
						{currentTab !== '50强' && currentTab !== '15强' && currentTab !== '3强' && 
							<View style={ `position:absolute;top:27px;display:inline-block` }>
								<View style={ `display:inline-block` }>参与选手：{stat.total_apprentice}</View>							
								<View style={ `display:inline-block;margin-left: 10px; ` }>累积投票：{stat.total_ticket}</View>
							</View> }

						
            <View>我的排名</View>
            <View style='margin: 0 23px 0 10px; color: #9B143B; font-size: 20px; font-weight: 700'>{ rank || '-' }</View>
            <View>我的票数</View>
            <View style='margin: 0 0 0 10px; color: #9B143B; font-size: 20px; font-weight: 700'>{ ticket_received || '-' }</View>
          </View>
          <View style='height: calc(100% - 190px); width: 100%'>
          {
            ranking.length === 0 ? (
              <View className='flex flex-justify-center flex-align-center' style='height: 100%; color: #104C5F'>投票暂未开始</View>
            ) : (
              currentTab === '3强'
                ? <Qiang3 ranking={ ranking } />
                : currentTab === '15强'
                  ? <Qiang15 ranking={ ranking } />
                  : currentTab === '50强'
                    ? <Qiang50 ranking={ ranking } />
                    : <QiangHai ranking={ ranking } />
            )
          }
          </View>
          <View style='position: absolute; bottom: 32px; width: 100%'>
            <Image onClick={ this.handleToCenter.bind(this) } src={ img_btn } style='width: 210px; height: 40px; display: flex; position:relative; left:calc(50% - 105px);' mode='widthFix' />
            <View style='text-align:center;font-size:14px;margin-top:6px;color:#333;'>一个ID每天拥有3次投票机会</View>
          </View>
        </View>
      </View>
    )
  }
}

export default App

// 31.277574,121.336752
