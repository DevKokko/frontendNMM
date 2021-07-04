import React from 'react';
import styles from './Message.module.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import produce from 'immer';
import { API } from '../../Services/API';
import { connect } from 'react-redux';

class Message extends React.Component {

    state = {
        dropdownOpen: false
    };

    toggle = () => {
        if(this.props.userId === this.props.data.userId){
            return;
        }
        this.setState(
            produce( draft => {
                draft.dropdownOpen = !draft.dropdownOpen
            })
        )
    }

    reportUser = () => {
        this.setState({dropdownOpen: false});
        API.reportUser(this.props.userId, this.props.data.userId).then(res => {
            
        });
    }

    banUser = () => {
        this.setState({dropdownOpen: false});
        API.banUser(this.props.data.userId).then(res => {
            
        });
    }

    addFriend = () => {
        this.setState({dropdownOpen: false});
        API.addFriend(this.props.userId, this.props.data.userId).then(res => {
            
        });
    }

    render() {
        return (
            <div>
                
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <span id="Popover1" className={styles.username} style={{color: (this.props.userId === this.props.data.userId)?"#704226":"#ffcc66"}}>
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
                </Dropdown>
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
