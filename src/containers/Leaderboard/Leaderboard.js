import React from 'react';
import { connect } from 'react-redux';
import styles from './Leaderboard.module.scss';
import { API } from '../../Services/API';
import produce from 'immer';
import Datatable from '../Datatable/Datatable';

class Leaderboard extends React.Component {

    state = {
        body: []
    };

    componentDidMount() {
        API.getLeaderboard().then(res => {
            console.log(res);
            
            function compare( a, b ) {
                if ( a.elo < b.elo ){
                    return -1;
                }
                if ( a.elo > b.elo ){
                    return 1;
                }
                if ( a.username < b.username ){
                    return 1;
                }
                if ( a.username > b.username ){
                    return -1;
                }
                return 0;
            }
            res.sort(compare);

            let leaderboard = [];
            res.forEach((row,idx) => {
                leaderboard.push([(idx+1), row.username, row.elo]);
            })
            console.log(leaderboard);
            this.setState(
                produce( draft => {
                    draft.body = leaderboard;
                })
            );
        })
    }

    render() {
        return (
            <div className={styles.LeaderboardPage_content}>
                <p className={styles["header"]}>
                    Leaderboard
                </p>
                <div className={styles.TableContainer}>
                    <Datatable header={["Rank", "Username", "ELO"]} body={this.state.body}/>
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

export default connect( mapStateToProps )( Leaderboard ) ;
