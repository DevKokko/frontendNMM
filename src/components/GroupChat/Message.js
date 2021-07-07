import React from 'react';
import styles from './Message.module.scss';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import produce from 'immer';
import { API } from '../../Services/API';
import { connect } from 'react-redux';

class Message extends React.Component {

    state = {
    };

    reportUser = () => {
        API.reportUser(this.props.userId, this.props.data.userId).then(res => {
            
        });
    }

    banUser = () => {
        API.banUser(this.props.data.userId).then(res => {
            
        });
    }

    addFriend = () => {
        API.addFriend(this.props.userId, this.props.data.userId).then(res => {
            
        });
    }

    render() {
        if(this.props.userId == this.props.data.userId)
            return (
                <div>
                    <span className={styles.username} style={{color: (this.props.userId === this.props.data.userId)?"#704226":"#ffcc66"}}>
                        {this.props.data.username}
                    </span>: {this.props.data.message}
                </div>);
        return (
            <div>
                <UncontrolledDropdown>
                    <DropdownToggle
                        tag="span"
                    >
                        <span className={styles.username} style={{color: (this.props.userId === this.props.data.userId)?"#704226":"#ffcc66"}}>
                            {this.props.data.username}
                        </span>: {this.props.data.message}
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
            </div>
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

export default connect( mapStateToProps )( Message ) ;
