import React from 'react';
import styles from './GroupChat.module.scss';
import Message from './Message';
import produce from 'immer';
import { WS_URL_PUBLIC_CHAT } from '../../Services/Websockets';

class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputValue: ''
        };
    }

    ws = new WebSocket(WS_URL_PUBLIC_CHAT);

    componentDidMount () { 
        this.ws.onopen = () => { 
        } 
     
        this.ws.onmessage = e => { 
            const data = JSON.parse(e.data);
            if(data.message == "ping"){
                this.ws.send({type: "pong"});
            }
            else{
                this.setState(
                    produce( draft => {
                        draft.messages.push({username: data.username, userId: data.userId, message: data.message});
                    })
                );
                document.getElementById("chatBox").scrollTo(0, document.getElementById("chatBox").scrollHeight);
            }
        } 
     
        this.ws.onclose = () => { 
            setTimeout(()=>{
                if(this.ws.readyState !== WebSocket.OPEN){
                    this.ws = new WebSocket(WS_URL_PUBLIC_CHAT);
                }
            },5000);
        }
    }

    SendMessage = () => {
        const data = {type: "chat", username: this.props.username, userId: this.props.userId, message: this.state.inputValue};
        this.ws.send(JSON.stringify(data));

        this.setState({inputValue: ''});
    }

    render() {

        return (
            <div className={styles.chatContainer}>
                <div id="chatBox" className={styles.chatBox}>
                    {
                        this.state.messages.map((data,idx) => {
                            return <Message key={idx} data={data}/>
                        })
                    }
                </div>
                <div className={styles.inputBox}>
                    <input type="text" placeholder="Enter your message here..." value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})} onKeyDown={(e) => {if(e.key=="Enter") this.SendMessage()}} style={{width: "100%"}}/>
                </div>
            </div>
        );
    }
}

export default GroupChat; 
