//Vendor
import React from 'react';

//prop-types
import PropTypes from 'prop-types';

//material-ui
import { withStyles } from 'material-ui/styles';


//react logo
import logo from '../images/Powered-by-Foursquare-black-300.png';

/**
 * JSS styles
 */
const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#FFB81C',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%', 
    height: 60,
    marginTop: 100
  },
  flex: {
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    height: 60,
  },
  logo: {
    paddingTop: 10,
    width: 300
  },
  link: {
    color: 'white',
    paddingLeft: 10
  }
};

/**
 * Render the Footer component same for all pages
 */
function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <img src={logo} alt="react" className={classes.logo} />
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
