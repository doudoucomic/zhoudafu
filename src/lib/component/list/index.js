import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.css'
class App extends Component {
  static options = {
    addGlobalClass: true
  }
  render() {
    return (
      <View
        className={ `list-container ${ this.props.className || '' }` }
        style={ this.props.style || '' }
      >
        <View
          className={ `list-label ${ this.props.labelClassName || '' }` }
          style={ this.props.labelStyle || '' }
        >
          { this.props.label }
        </View>
        <View
          className={ `list-content ${ this.props.contentClassName || '' }` }
          style={ this.props.contentStyle || '' }
        >
          { this.props.renderContent }
        </View>
      </View>
    )
  }
}

export default App
