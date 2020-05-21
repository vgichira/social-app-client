import React, { Component } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppLogo from "../images/icon.png";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

        const response = await axios.post('/login', loginData);

        console.log(response.data);
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppLogo} className={classes.imageLogo} alt="Monkey Logo"/>
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" type="email" name="email" label="Email" 
                        className={classes.textField} value={this.state.email}
                        onChange={this.handleChange} fullWidth />

                        <TextField id="password" type="password" name="password" label="Password" 
                        className={classes.textField} value={this.state.password}
                        onChange={this.handleChange} fullWidth />

                        <Button variant="contained" type="submit" className={classes.button} color="primary">Login</Button>
                    </form>
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
