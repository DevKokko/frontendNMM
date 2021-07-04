import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, CardFooter, Media } from 'reactstrap';
import styles from './ProfilePage.module.scss';
import axios from 'axios';
import { Roller } from 'react-spinners-css';
import { API } from '../../Services/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class ProfilePage extends React.Component {

    state = {
        file: null,
        image: null,
        imageChanged: false,
        uploading: false
    };

    handleProfilePic = (e) => {
        this.setState({
            file: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0]),
            imageChanged: true
        })
    }
    
    deleteImage = () => {
        this.setState({
            file: null,
            image: null,
            imageChanged: true
        })
    }

    componentDidMount() {
        API.getProfilePic(this.props.username).then(res => {
            this.setState({image: res});
        });
    }

    submit = () => {
        if(this.state.imageChanged){
            this.setState({uploading: true});
            API.uploadProfilePic(this.state.file, this.props.username).then(res => {
                this.setState({uploading: false});
            });
        }
    }

    render() {
        return (
            <div className={styles.ProfilePage_content}>
                <div className={styles.profileForm}>
                    <div style={{textAlign: "center"}}>
                        <div className={styles.profilePic}>
                            <img src={this.state.image||"https://www.w3schools.com/howto/img_avatar.png"}/>
                            <div onClick={() => {if(!this.state.uploading) document.getElementById("avatar").click()}} className={styles.edit}>
                                Edit
                            </div>
                            <div className={styles.close} style={{display: this.state.image?"block":"none"}}>
                                <FontAwesomeIcon onClick={this.deleteImage} icon={faTimesCircle} className="ml-2"/>
                            </div>
                            <div className={styles.loader} style={{opacity: this.state.uploading?1:0}}>
                                <Roller color="#fff"/>
                            </div>
                        </div>
                        <input style={{display: "none"}} onChange={this.handleProfilePic} type="file" id="avatar" accept="image/png, image/jpeg"></input>
                    </div>
                    <hr/>
                    <div style={{textAlign: "center"}}>
                        <div className={styles.submitBtn} onClick={() => this.submit()}>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthed : state.auth.token ? true : false,
        username : state.auth.username,
        userId : state.auth.userId
    }
}

export default connect( mapStateToProps )( ProfilePage ) ;
