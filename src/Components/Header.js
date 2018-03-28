//Vendor
import React from 'react';

//prop-types
import PropTypes from 'prop-types';

//material-ui
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, Icon } from 'material-ui';

/**
 * JSS styles
 */
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: '#000',
    textAlign: 'center',
    fontSize: 80
  },
  toolBar: {
    height: 170,
    backgroundColor: "#FFB81C"
  },
  icon: {
    fontSize: 80,
    color: '#000',paddingLeft: 10,
    paddingRight: 10
  }
};

/**
 * Render the Header Component
 * @param {object} classes passes in JSS styles
 */
function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img src ={require("../images/bridge.png")} alt = "Bridge"/>
          <Typography variant="display3" className={classes.flex}>
            Steel City Eats
          </Typography>
          <Icon className ={classes.icon} >local_dining</Icon>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
