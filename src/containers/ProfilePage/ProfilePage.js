import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, CardFooter, Media, Alert } from 'reactstrap';
import styles from './ProfilePage.module.scss';
import axios from '../../Services/axiosConfig';
import { Roller } from 'react-spinners-css';
import { API } from '../../Services/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import produce from 'immer';
import MyInput from '../../components/UI/MyInput/MyInput';
import { checkValidity } from '../../Utilities/validityUtility';

class ProfilePage extends React.Component {

    state = {
        file: null,
        image: null,
        imageChanged: false,
        uploading: false,
        elo: null,
        updatedSuccessfully: false,
        isVerified: true,
        formControls: {
            email: {
                rules: {
                    required: true,
                    isEmail: true
                },
                id: "update_user_email",
                name: "Email",
                value: '',
                type: "text",
                placeholder: "",
                feedback: null,
                validity: '',
                readOnly: true
            },

            old_password: {
                rules: {
                    required: true,
                    isPassword: true,
                    minLength: 8,
                    maxLength: 15
                },
                id: "update_user_old_pwd",
                name: "Existing Password",
                value: '',
                type: "password",
                placeholder: '',
                feedback: null,
                validity: ''
            },

            new_password: {
                rules: {
                    required: true,
                    isPassword: true,
                    minLength: 8,
                    maxLength: 15
                },
                id: "update_user_pwd",
                name: "New Password",
                value: '',
                type: "password",
                placeholder: '',
                feedback: null,
                validity: ''
            },

            new_password2: {
                rules: {
                    required: true,
                    mustMatch: "password"
                },
                id: "update_user_pwd_rep",
                name: "Confirm New Password",
                value: '',
                type: "password",
                placeholder: '',
                feedback: null,
                validity: ''
            },

            first_name: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "update_user_name",
                name: "Name",
                value: '',
                type: "text",
                placeholder: "Name",
                feedback: null,
                validity: ''
            },

            last_name: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "update_user_surname",
                name: "Surname",
                value: '',
                type: "text",
                placeholder: "Surname",
                feedback: null,
                validity: ''
            }
        }
    }

    //---------------------Form Manipulation------------------------

    setFormField = (controlName, feedback, validity, value) => {
        this.setState(
            produce(draft => {
                draft.formControls[controlName].feedback = feedback;
                draft.formControls[controlName].validity = validity;
                if (value)
                {
                    draft.formControls[controlName].value = value;
                }
            })
        );
    }

    checkEmailValidity = () => {
        API.checkEmailValidity(axios, this.state.formControls.email.value).then(res => {
            if (!res)
            {
                return;
            }

            if (!res.success)
            {
                this.setFormField("email", null, 'is-valid', null);
            }
            else
            {
                this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
            }
        });
    }

    inputBlurredHandler = ( event, controlName ) => {
        if ((controlName === "email") && (this.state.formControls.email.validity !== "is-invalid") && (this.state.formControls.email.value.trim() !== '' ))
        {
            this.checkEmailValidity();
        }
        else if ((controlName === "new_password2") && (this.state.formControls.new_password2.validity !== "is-invalid") && (this.state.formControls.new_password2.value.trim() !== '' ))
        {
            if (this.state.formControls.new_password.value !== this.state.formControls.new_password2.value)
            {
                this.setFormField("new_password2", "Passwords don't match", "is-invalid", null);
            }
            else if (this.state.formControls.new_password.validity !== "is-invalid")
            {
                this.setFormField("new_password2", null, "is-valid", null);
            }
        }
        else if ((controlName === "new_password") && (this.state.formControls.new_password2.value.trim() !== ''))
        {
            if (this.state.formControls.new_password.value !== this.state.formControls.new_password2.value)
            {
                this.setFormField("new_password2", "Passwords don't match", "is-invalid", null);
            }
            else
            {
                this.setFormField("new_password2", null, "is-valid", null);
            }
        }
    }

    inputChangedHandler = ( event, controlName ) => { 
        const value = event.target.value;
        this.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 
            
        const res = checkValidity(value, this.state.formControls[controlName].rules);
        if (res.report)
        {
            if ((controlName === "password1") || (controlName === "email"))
            { 
                this.setFormField(controlName, null, '', null);
            }
            else
            {
                this.setFormField(controlName, null, 'is-valid', null);
            }
        }
        else
        {
            this.setFormField(controlName, res.msg, "is-invalid", null);
        }
    }

    submit = () => {
        this.setState(
            produce(draft => {
                draft.updatedSuccessfully = false;
            })
        );

        if(this.state.imageChanged){
            this.setState({uploading: true});
            API.uploadProfilePic(this.state.file, this.props.username).then(res => {
                this.setState({uploading: false});
            });
        }

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for ( let key in this.state.formControls ) 
        {
            formData[key] = this.state.formControls[key].value;

            if (this.state.formControls[key].validity === "is-valid")
            {
                continue;
            }

            if (this.state.formControls[key].validity === "is-invalid")
            {
                formIsValid = false;
                continue;
            }

            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            if (!res.report)
            {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
        }

        if (!formIsValid)
        {
            this.setState(
                produce(draft => {
                    for ( let key in errFeedBack ) 
                    {
                        draft.formControls[key].feedback = errFeedBack[key];
                        draft.formControls[key].validity = "is-invalid";
                    }
                })
            );
            return;
        }
        API.updateProfile(axios, formData).then(res => {
            if (!res)
            {
                return;
            }
                    
            if (!res.success)
            {
                if (res.message === "Wrong existing password")
                {
                    this.setFormField("old_password", "The existing password is wrong", 'is-invalid', null);
                }
                // else if (res.message === "New passwords do not match")
                // {
                //     this.setFormField("new_password", " New passwords don't match", "is-invalid", null);
                // }
            }
            else
            {
                // this.props.history.replace("/");
                this.setState(
                    produce(draft => {
                        draft.updatedSuccessfully = true;
                        draft.formControls.old_password.value = '';
                        draft.formControls.new_password.value = '';
                        draft.formControls.new_password2.value = '';
                    })
                );
            }
        });
    }

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

        API.getUserInfo(axios).then(res=>{
            console.log(res);
            this.setState(
                produce(draft => {
                    draft.formControls.email.value = res.email;
                    draft.formControls.first_name.value = res.first_name;
                    draft.formControls.last_name.value = res.last_name;
                    draft.elo = res.elo;
                    draft.isVerified = res.is_verified_account
                })
            );
        });
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.formControls ) 
        {
            formElementsArray.push( {
                id: key,
                config: this.state.formControls[key]
            });
        }

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
                        <h2 className={styles["username"] + " my-3"}>
                            {this.props.username}
                        </h2>
                        <h4 className={styles["elo"]}>
                            ELO: {this.state.elo}
                        </h4>
                        <input style={{display: "none"}} onChange={this.handleProfilePic} type="file" id="avatar" accept="image/png, image/jpeg"></input>
                    </div>
                    <hr/>
                    {
                        this.state.updatedSuccessfully && 
                        <Alert color="success">
                            Personal info updated successfully!
                        </Alert>
                    }
                    {
                        !this.state.isVerified && 
                        <Alert color="warning">
                            Account is not verified
                        </Alert>
                    }
                    {
                        formElementsArray.map( formElement => (
                            <MyInput
                                key={formElement.id}
                                id={formElement.config.id}
                                name={formElement.config.name}
                                value={formElement.config.value}
                                type={formElement.config.type}
                                placeholder={formElement.config.placeholder}
                                feedback={formElement.config.feedback}
                                validity={formElement.config.validity}
                                readOnly={formElement.config.readOnly}
                                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
                                blurred={( event ) => this.inputBlurredHandler ( event, formElement.id )}
                            />
                        ))
                    }
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

export default withRouter(connect( mapStateToProps )( ProfilePage ));
