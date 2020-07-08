import React, { Component } from 'react';
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Profile from "../components/Profile";

// components

import Screams from "../components/Screams";

class home extends Component {

    state = {
        screams : null
    }

    async componentDidMount(){
        try {
            const screams = await axios.get('/screams');

            this.setState({
                screams: screams.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let screamDataMarkup = this.state.screams ? (
        this.state.screams.map(scream => <Screams key={scream.screamID} scream={scream}/>)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={10} >
                <Grid item sm={8} xs={12} >
                    {screamDataMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home
