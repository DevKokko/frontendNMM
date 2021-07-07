import React from 'react';
import { connect } from 'react-redux';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { API } from '../../Services/API';
import produce from 'immer';
import styles from './AdminUsersTableRow.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import axios from '../../Services/axiosConfig';

class AdminUsersTableRow extends React.Component {

    state = {
        image: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        elo: "",
        is_banned: false,
        is_verified_account: false,
        reports: 0
    };

    reportUser = () => {
        API.reportUser(this.props.userId, this.props.data.user_id).then(res => {
            
        });
    }

    addFriend = () => {
        API.addFriend(this.props.userId, this.props.data.user_id).then(res => {
            
        });
    }

    submit = () => {
        this.props.onUpdate();
        const data = {
            id: this.props.data.user_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            elo: this.state.elo,
            is_banned: this.state.is_banned,
            is_verified_account: this.state.is_verified_account,
            is_staff: this.state.is_staff
        };
        API.adminUpdateUser(axios, data).then(res => {
            this.props.onUpdated();
        });
    }

    componentDidMount() {
        API.getProfilePic(this.props.data.username).then(res => {
            this.setState({image: res});
        });
        this.setState({
            username: this.props.data.username,
            email: this.props.data.email,
            first_name: this.props.data.first_name,
            last_name: this.props.data.last_name,
            elo: this.props.data.elo,
            is_banned: this.props.data.is_banned,
            is_verified_account: this.props.data.is_verified_account,
            reports: this.props.data.reports,
            is_staff: this.props.data.is_staff
        })
    }

    render() {
        return (
            <tr>
                <th className={styles.username}>
                    {
                        this.props.userId != this.props.data.user_id &&
                        <UncontrolledDropdown>
                            <DropdownToggle
                                tag="span"
                            >
                                {this.state.username}
                            </DropdownToggle>
                            
                            <DropdownMenu>
                                <DropdownItem onClick={this.reportUser}>
                                    Report
                                </DropdownItem>
                                {
                                    this.props.isAdmin && 
                                    <DropdownItem onClick={this.banUser}>
                                        Ban
                                    </DropdownItem>
                                }
                                <DropdownItem onClick={this.addFriend}>
                                    Add Friend
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    }
                    {
                        this.props.userId == this.props.data.user_id &&
                        <span>{this.state.username}</span>
                    }
                </th>
                <th>
                    {this.state.email}
                </th>
                <th>
                    <input className={styles.input} type="text" onChange={(e) => this.setState({first_name: e.target.value})} value={this.state.first_name}/>
                </th>
                <th>
                    <input className={styles.input} type="text" onChange={(e) => this.setState({last_name: e.target.value})} value={this.state.last_name}/>
                </th>
                <th>
                    <input className={styles.input} type="number" onChange={(e) => this.setState({elo: e.target.value})} value={this.state.elo}/>
                </th>
                <th>
                    <input type="checkbox" checked={this.state.is_banned} onChange={()=>this.setState(
                        produce( draft => {
                            draft.is_banned = !draft.is_banned
                        })
                    )}/>
                </th>
                <th>
                    <input type="checkbox" checked={this.state.is_verified_account} onChange={()=>this.setState(
                        produce( draft => {
                            draft.is_verified_account = !draft.is_verified_account
                        })
                    )}/>
                </th>
                <th>
                    <input type="checkbox" checked={this.state.is_staff} onChange={()=>this.setState(
                        produce( draft => {
                            draft.is_staff = !draft.is_staff
                        })
                    )}/>
                </th>
                <th>
                    {this.state.reports}
                </th>
                <th>
                    <div onClick={this.submit} style={{cursor: "pointer", color: "green"}}>
                        <FontAwesomeIcon icon={faCheckCircle}/>
                    </div>
                </th>
            </tr>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthed : state.auth.token ? true : false,
        username : state.auth.username,
        userId : state.auth.userId,
        isAdmin: state.auth.isAdmin
    }
}

export default connect( mapStateToProps )( AdminUsersTableRow ) ;
