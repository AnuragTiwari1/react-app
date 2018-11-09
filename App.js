import React from 'react'
import RootStack from './src/router'
import {Provider} from "react-redux";
import {createStore} from 'redux'
import config from "./src/store/reducer";
const store = createStore(config);
export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
      <RootStack/>
      </Provider>
    )
  }
}
