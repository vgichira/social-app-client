import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI SHTEFF
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

const styles = {
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        // '& a': {
        //   color: theme.palette.primary.main
        // }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }

export class Profile extends Component {
    render() {
        const { classes, user: {credentials: {handle, createdAt, imageUrl, bio, website, location, authenticated }, loading}} = this.props

        let profileMarkup = loading ? (<p>Loading</p>) : 
        (authenticated ? 
        (<Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="profile-image">
                    <img src={imageUrl} alt="profile"/>
                </div>
                <hr/>
                <div className="profile-details">

                </div>
            </div>
        </Paper>) : (<p>No data found</p>))

        return profileMarkup
    }
}

const mapStateToProps = state =>({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
