import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { API } from '../../Services/API';
import produce from 'immer';
import styles from './LeaderboardTableRow.module.scss';

class LeaderboardTableRow extends React.Component {

    state = {
        image: null,
        dropdownOpen: false
    };

    toggle = () => {
        this.setState(
            produce( draft => {
                draft.dropdownOpen = !draft.dropdownOpen
            })
        )
    }

    reportUser = () => {
        this.setState({dropdownOpen: false});
        API.reportUser(this.props.userId, this.props.data.id).then(res => {
            
        });
    }

    addFriend = () => {
        this.setState({dropdownOpen: false});
        API.addFriend(this.props.userId, this.props.data.id).then(res => {
            
        });
    }

    componentDidMount() {
        API.getProfilePic(this.props.data.username).then(res => {
            this.setState({image: res});
        });
    }

    render() {
        return (
            <tr>
                <th className={styles.username}>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle
                            tag="span"
                            data-toggle="dropdown"
                            aria-expanded={this.state.dropdownOpen}
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
                            <DropdownItem onClick={this.addFriend}>
                                Add Friend
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </th>
                <th>
                    {this.props.data.elo}
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

export default connect( mapStateToProps )( LeaderboardTableRow ) ;
