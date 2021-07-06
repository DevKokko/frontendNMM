import React from 'react';
import { withRouter } from 'react-router-dom';
import { API } from '../../Services/API';
import { getQueryParams } from '../../Utilities/URIutil';
import styles from './VerificationPage.module.scss';
import produce from 'immer';
import { Row, Col, Alert } from 'reactstrap';
import axios from '../../Services/axiosConfig';


class VerificationPage extends React.Component {

    state = {
        verified: false
    };

    render() {
        return (
            <Row id={styles.content}> 
                <Col xs="12" id={styles.bg_gradient}>
                    <Row className="justify-content-center pb-5">
                        <Col xs="12" md="8" lg="4">
                            {
                                this.state.verified ?
                                <Alert color="success">
                                    Acount verified!
                                </Alert> :
                                <Alert color="danger">
                                    Account could not be verified...
                                </Alert>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    componentDidMount(){
        const verificationToken = getQueryParams(this.props.location.search).token;
        console.log("verification token: ", verificationToken)
        if (!verificationToken) {
            this.props.history.replace("/");
        }

        // API.verifyAccount(axios, { "token": verificationToken }).then(res=>{
        //     if (!res) {
        //         return;
        //     }
                    
        //     if (res.success) {
        //         this.setState(
        //             produce(draft => {
        //                 draft.verified = true;
        //             })
        //         );
        //     }
        // });
    }
    
}

export default withRouter(VerificationPage);