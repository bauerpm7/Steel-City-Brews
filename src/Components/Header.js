//Vendor
import React, { Component } from 'react';

//prop-types
import PropTypes from 'prop-types';

//material-ui
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, Icon, Button } from 'material-ui';

/**
 * JSS styles
 */
const styles = theme => ({
  root: {
    minHeight: 170
  },
  flex: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Bevan',
    fontSize: 80,
    [theme.breakpoints.down('md')]: {
      fontSize: 48
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      paddingTop: 20
    }
  },
  subtitle: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 18
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  toolBar: {
    minHeight: 170,
    backgroundColor: "#FFB81C",
    display: 'flex',
    flexWrap: 'wrap'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'inline-block'
  },
  button: {
    backgroundColor: 'black',
    color: "#FFB81C",
    position: 'fixed',
    top: 10,
    left: 10
  }
});

/**
 * Render the Header Component
 * @param {object} classes passes in JSS styles
 */
class Header extends Component {

  

  render() {

    const { classes, handleDrawerToggle, drawerOpen } = this.props;
    console.log(drawerOpen)
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>              
            <div className={classes.container}>
              <Typography variant="display3" className={classes.flex}>
                Steel City Brews <span className ="glyphicons glyphicons-beer"></span>
              </Typography>
              <Typography variant="title" className={classes.subtitle}>
                Local Pittsburgh Breweries and GastroPubs
              </Typography>
            </div>
            <Button 
              role = 'button'
              aria-label = 'Filter Breweries'
              mini = {true} 
              variant='fab' 
              className={classes.button}
              onClick={() => handleDrawerToggle()}>
              <Icon>filter_list</Icon>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
