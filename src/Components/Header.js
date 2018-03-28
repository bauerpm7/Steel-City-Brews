//Vendor
import React from 'react';
import { Link } from 'react-router-dom';

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
    fontSize: 24,
    color: 'white'
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  link: {
    color: 'inherit'
  }, 
  appBar: {
    height: 200
  }
};

/**
 * Rener the LibraryHeader Component
 * @param {object} classes passes in JSS styles
 */
function LibraryHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" className={classes.flex}>
            Welcome to MyReads
          </Typography>
          <Link to="/search" className={classes.link}>
            <Icon className={classes.icon} aria-label="home">
              search
            </Icon>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LibraryHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LibraryHeader);
