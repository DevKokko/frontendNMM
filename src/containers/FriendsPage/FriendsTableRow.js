import React from 'react';
import { connect } from 'react-redux';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { API } from '../../Services/API';
import produce from 'immer';
import styles from './FriendsTableRow.module.scss';

class FriendsTableRow extends React.Component {

    state = {
        image: null
    };


    reportUser = () => {
        API.reportUser(this.props.userId, this.props.data.id).then(res => {
            
        });
    }

    removeFriend = () => {
        API.removeFriend(this.props.userId, this.props.data.id).then(res => {
            this.props.onDelete();
        });
    }

    componentDidMount() {
        API.getProfilePic(this.props.data.username).then(res => {
            this.setState({image: res});
        });
    }

    render() {
        if(this.props.userId != this.props.data.id){
            return (
                <tr>
                    <th className={styles.username}>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                tag="span"
                            >
                                {this.props.data.username}
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
                                <DropdownItem onClick={this.removeFriend}>
                                    Remove Friend
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </th>
                </tr>
            );
        }
        else{
            return (
                <tr>
                    <th className={styles.username}>
                        {this.props.data.username}
                    </th>
                </tr>
            );
        }
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

export default connect( mapStateToProps )( FriendsTableRow ) ;
