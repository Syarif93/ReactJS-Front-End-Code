import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../utils/MyButton';
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icon
import ChatIcon from '@material-ui/icons/Chat'


// Redux
import { connect } from 'react-redux'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {
    
    render() {
        dayjs.extend(relativeTime)
        const { 
            classes, 
            scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            user: { authenticated, credentials: { handle } }
        } = this.props
        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount}</span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyle(styles)(Scream))