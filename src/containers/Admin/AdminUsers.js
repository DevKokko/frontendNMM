import React from 'react';
import { connect } from 'react-redux';
import styles from './AdminUsers.module.scss';
import { API } from '../../Services/API';
import produce from 'immer';
import AdminUsersTableRow from './AdminUsersTableRow';

class AdminUsers extends React.Component {

    state = {
        users: []
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

    onDelete = () =>{
        API.getUsers().then(res => {
            this.setState(
                produce( draft => {
                    draft.users = res;
                })
            );
        })
    }

    render() {
        return (
            <div className={styles.AdminUsersPage_content}>
                <div className={styles.TableContainer}>
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
                                <th>Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((x, idx) => {
                                    return <AdminUsersTableRow onDelete={this.onDelete} key={idx} data={x}/>
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
