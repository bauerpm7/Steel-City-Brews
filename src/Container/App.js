import React, { Component } from 'react';
import Header from '../Components/Header'
import PghMap from '../Components/Map'
import Footer from '../Components/Footer'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  app_container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={ classes.app_container }>
        <Header/>
        <PghMap />
        <Footer />
      </div>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);
