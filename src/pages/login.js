import React, { Component } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppLogo from "../images/icon.png";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom"
import axios from "axios";

import Grid from "@material-ui/core/Grid";

const styles = {
    form: {
        textAlign:"center",
    }, 
    imageLogo: {
        marginBottom: "10px"
    },
    textField: {
        marginBottom: "30px"
    },
    pageTitle: {
        marginBottom: "20px"
    },
    errorMsg: {
        color: "red",
        textAlign: "left"
    }
}

class login extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
        errors: {}
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        this.setState({
            loading: true
        })

        const loginData = {
            email: this.state.email, 
            password: this.state.password 
        }
        try{
            const response = await axios.post('/login', loginData);

            this.setState({
                loading: false 
            })

            this.props.history.push("/");
        }catch(err){
            this.setState({
                errors: err.response.data, 
                loading: false, 
            })
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors: {email, password, general}, loading} = this.state;
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
                    <small>Dont have an account? <Link to="/signup">Create Free Account</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
