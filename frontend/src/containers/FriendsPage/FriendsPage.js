import React from 'react';
import { connect } from 'react-redux';
import styles from './FriendsPage.module.scss';
import { API } from '../../Services/API';
import FriendsTableRow from './FriendsTableRow';

class FriendsPage extends React.Component {

    state = {
        friends: []
    };

    componentDidMount() {
        API.getFriends(this.props.userId).then(res => {
            this.setState({friends: res});
        })
    }

    onDelete = () =>{
        API.getFriends(this.props.userId).then(res => {
            this.setState({friends: res});
        })
    }

    render() {
        return (
            <div className={styles.FriendsPage_content}>
                <div className={styles.TableContainer}>
                    <table>
                        {
                            this.state.friends.map((x, idx) => {
                                return <FriendsTableRow onDelete={this.onDelete} key={idx} data={x}/>
                            })
                        }
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

export default connect( mapStateToProps )( FriendsPage ) ;
