
import React from 'react';
import { NavLink as RouterNavLink, withRouter }  from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import produce from 'immer';
import classes from './NavigationItem.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { API } from '../../Services/API';

class NavigationProfile extends React.Component {
    
    state = {
        dropdownOpen: false,
        image: null
    };

    toggle = () => {
        this.setState(
            produce( draft => {
                draft.dropdownOpen = !draft.dropdownOpen
            })
        )
    }

    componentDidMount() {
        API.getProfilePic(this.props.username).then(res => {
            this.setState({image: res});
        });
    }


    render() {        
        return (
            <NavItem className="d-flex align-content-center p-1 mr-2">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <img src={this.state.image||"https://www.w3schools.com/howto/img_avatar.png"} style={{cursor: "pointer", width: "50px", boxShadow: "0px 0px 2px 6px #ffcc66", height: "50px", borderRadius: "50%", objectFit: "cover"}}/>
                    </DropdownToggle>
                    
                    <DropdownMenu>
                        <DropdownItem header>Hello, <b>{this.props.username}</b>!</DropdownItem>
                        <RouterNavLink
                            style={{textDecoration: "none"}}
                            exact
                            to={"/profile"}
                        >
                            <DropdownItem>
                                My Profile
                            </DropdownItem>
                        </RouterNavLink>
                        <RouterNavLink
                            style={{textDecoration: "none"}}
                            exact
                            to={"/friends"}
                        >
                            <DropdownItem>
                                My Friends
                            </DropdownItem>
                        </RouterNavLink>
                        <DropdownItem divider />
                        <RouterNavLink
                            style={{textDecoration: "none"}}
                            exact
                            to={"/logout"}
                        >
                            <DropdownItem>
                                Logout <FontAwesomeIcon icon={faSignOutAlt} className="ml-2"/>
                            </DropdownItem>
                        </RouterNavLink>
                    </DropdownMenu>
                </Dropdown>
            </NavItem>
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

export default connect( mapStateToProps )( NavigationProfile ) ;