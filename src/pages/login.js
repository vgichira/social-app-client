import React, { Component } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppLogo from "../images/icon.png";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom"
// redux shteff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    ...theme.globalStyles
})

class login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    handleSubmit = async event => {
        event.preventDefault();

        const loginData = {
            email: this.state.email, 
            password: this.state.password 
        }

        this.props.loginUser(loginData, this.props.history)
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI:{ loading } } = this.props;
        const { errors: {email, password, general}} = this.state;
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

                        <TextField id="password" type="password" name="password" label="Password" 
                        className={classes.textField} value={this.state.password}
                        helperText={password}
                        error={password ? true : false}
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
                    <small>Don't have an account? <Link to="/signup">Create Free Account</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user, 
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

login.propTypes = {
    classes: PropTypes.object.isRequired, 
    loginUser: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
    UI: PropTypes.object.isRequired 
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
