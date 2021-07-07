import React from 'react';
import { connect } from 'react-redux';
import styles from './AdminUsers.module.scss';
import { API } from '../../Services/API';
import produce from 'immer';
import { Alert } from 'reactstrap';
import AdminUsersTableRow from './AdminUsersTableRow';

class AdminUsers extends React.Component {

    state = {
        users: [],
        updated: false
    };

    componentDidMount() {
        API.getUsers().then(res => {
            console.log(res);
            this.setState(
                produce( draft => {
                    draft.users = res;
                })
            );
        })
    }

    onUpdate = () =>{
        this.setState({updated: false});
    }
    onUpdated = () =>{
        this.setState({updated: true});
    }

    render() {
        return (
            <div className={styles.AdminUsersPage_content}>
                <div className={styles.TableContainer}>
                    {
                        this.state.updated &&
                        <Alert color="success">
                            User Info successfully updated
                        </Alert>
                    }
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Elo</th>
                                <th>Banned</th>
                                <th>Verified</th>
                                <th style={{whiteSpace: "nowrap"}}>Is Admin</th>
                                <th>Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((x, idx) => {
                                    return <AdminUsersTableRow onUpdate={this.onUpdate} onUpdated={this.onUpdated} key={idx} data={x}/>
                                })
                            }
                        </tbody>
                    </table>
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

export default connect( mapStateToProps )( AdminUsers ) ;
