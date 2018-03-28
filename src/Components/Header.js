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

  },
  flex: {
    color: '#000',
    textAlign: 'center',
    fontSize: 80,
    [theme.breakpoints.down('md')]: {
      fontSize: 48
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 36
    }
  },
  bridge: {
    paddingTop: 10,
    paddingBottom: 10,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: 350
    },
    [theme.breakpoints.down('xs')]: {
      width: 300
    },
  },
  toolBar: {
    minHeight: 170,
    backgroundColor: "#FFB81C",
    display: 'flex',
    flexWrap: 'wrap'
  },
  icon: {
    fontSize: 80,
    color: '#000',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 48
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 36
    }
  },
  imageContainer: {
    flexGrow: 1,
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>              
            <div className={classes.imageContainer}>
              <img className={classes.bridge} src ={require("../images/bridge.png")} alt = "Bridge"/>
            </div>
            <div className={classes.container}>
              <Typography variant="display3" className={classes.flex}>
                Steel City Eats <Icon className ={classes.icon}>local_dining</Icon>
              </Typography>
            </div>
            <Button mini = {true} variant='fab' className={classes.button}>
              <Icon>menu</Icon>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
