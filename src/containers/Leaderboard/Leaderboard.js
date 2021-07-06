import React from 'react';
import { connect } from 'react-redux';
import styles from './Leaderboard.module.scss';
import { API } from '../../Services/API';
import produce from 'immer';
import Datatable from '../Datatable/Datatable';
import { Container, Row, Col } from 'reactstrap';


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
            <Container fluid className={styles.LeaderboardPage_content}>
                <Row className="mt-5 mb-3">
                    <Col className={styles["header"]}>
                        Leaderboard
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.TableContainer}>
                        <Datatable header={["Rank", "Username", "ELO"]} body={this.state.body}/>
                    </Col>
                </Row>
            </Container>
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
