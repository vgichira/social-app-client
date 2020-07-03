import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppLogo from '../images/icon.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
// Redux Shteff
import { connect } from "react-redux";
import { signupUser } from '../redux/actions/userActions';

import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.globalStyles
})

class signup extends Component {
    state = {
        email: "", 
        password: "", 
        confirmPassword: "", 
        handle: "", 
        loading: false, 
        errors: {}
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const {email, handle, password, confirmPassword} = this.state

        const newUserData = {
            email, 
            handle, 
            password, 
            confirmPassword 
        }

        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI:{loading, errors: {email, password, handle, confirmPassword, general}}} = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppLogo} className={classes.imageLogo} alt="Monkey Logo"/>
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        {general && (
                            <Typography className={classes.errorMsg} variant="body1">{general}</Typography>
                        )}
                        <TextField id="email" type="email" name="email" label="Email" 
                        className={classes.textField} value={this.state.email} 
                        helperText={email} 
                        error={email ? true : false }
                        onChange={this.handleChange} fullWidth />

                        <TextField id="handle" type="text" name="handle" label="User Handle" 
                        className={classes.textField} value={this.state.handle} 
                        helperText={handle} 
                        error={handle ? true : false }
                        onChange={this.handleChange} fullWidth />

                        <TextField id="password" type="password" name="password" label="Password" 
                        className={classes.textField} value={this.state.password}
                        helperText={password}
                        error={password ? true : false}
                        onChange={this.handleChange} fullWidth />

                        <TextField id="confirmPassword" type="password" name="confirmPassword" label="Confirm Password" 
                        className={classes.textField} value={this.state.confirmPassword}
                        helperText={confirmPassword}
                        error={confirmPassword ? true : false}
                        onChange={this.handleChange} fullWidth />
                        
                        <Button variant="contained" size="large" fullWidth type="submit" 
                        className={classes.button} color="primary" disabled={loading}>
                        {loading ? (
                            <CircularProgress size={30} />
                        ) : 
                        (
                            "Login"
                        )}
                        </Button>
                    </form><br/>
                    <small>Already have an account? <Link to="/login">Create Free Account</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired, 
    UI: PropTypes.object.isRequired, 
    signupUser: PropTypes.func.isRequired
}

const mapActionsToProps = {
    signupUser, 
}

const mapStateToProps = state => ({
    user: state.user, 
    UI: state.UI
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup))