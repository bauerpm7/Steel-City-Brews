import React, { Component } from 'react';
import Header from '../Components/Header'
import PghMap from '../Components/Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <PghMap />
      </div>

    );
  }
}

export default App;
