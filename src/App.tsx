import * as React from 'react'
import { Font } from 'expo'
import { Provider, client } from './apollo'
import Root from './navigation'
import I18n from './locale'

interface State {
  isAssetsLoaded: boolean
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      isAssetsLoaded: false
    }
  }

  async componentWillMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    try {
      await I18n.initAsync()
      await Font.loadAsync({
        regular: require('../assets/fonts/Comfortaa-Regular.ttf'),
        light: require('../assets/fonts/Comfortaa-Light.ttf'),
        bold: require('../assets/fonts/Comfortaa-Bold.ttf')
      })
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  render() {
    const { isAssetsLoaded } = this.state
    return <Provider client={client}>{isAssetsLoaded ? <Root /> : ''}</Provider>
  }
}
