import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const styles = {
    card: {
        display: "flex",
        marginBottom: 20
    },
    content: {

    },
    image: {
        minWidth: 200
    }, 
    large: {
        marginTop: 25,
        marginLeft: 10,
        width:60,
        height: 60
    }
}

class Screams extends Component {
    render() {
        dayjs.extend(relativeTime)

        const { classes, scream:{ imageUrl, userHandle, createdAt, body } } = this.props

        return (
            <Card className={classes.card}>
                <Avatar alt="Remy Sharp" src={imageUrl} className={classes.large} />

                <CardContent>
                <Typography gutterBottom variant="h5" component={Link} to={`/users/${userHandle}`} >
                    {userHandle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {body}
                </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Screams)
