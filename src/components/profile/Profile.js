import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyle from '@material-ui/core/styles/withStyles'
import profile from '../../utils/profile'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../utils/MyButton'
import ProfileSkeleton from '../../utils/ProfileSkeleton'

// Mui stuff
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

// Icon
import EditIcon from '@material-ui/icons/Edit'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import Paper from '@material-ui/core/Paper'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

// Redux stuff
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'


const styles = profile

class Profile extends Component {
    handleImageChange = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        const { 
            classes, 
            user: { 
                credentials: { handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated
            } 
        } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input 
                            type="file" 
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange} />
                        <MyButton 
                            tip="Edit profile picture" 
                            onClick={this.handleEditPicture}
                            btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton
                        tip="Logout" 
                        onClick={this.handleLogout}
                        placement="top">
                        <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, pleace login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="signin">
                        SignIn
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="signup">
                        SignUp
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />)

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyle(styles)(Profile))
