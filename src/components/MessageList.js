import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends React.Component{

  componentWillUpdate(){
    const node=ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop+node.clientHeight+100 >= node.scrollHeight
  }

  componentDidUpdate(){
    if(this.shouldScrollBottom){
      const node=ReactDOM.findDOMNode(this);
      node.scrollTop=node.scrollHeight;
    }
  }

  render(){
    if(!this.props.roomId){
      return(
        <div className="message-list">
          <p>Join A Room</p>
        </div>
      )
    }
    else{
      return(
        <div className="message-list">
          {this.props.messages.map((message,index)=>{
            return(
              <Message key={index} username={message.senderId} text={message.parts[0].payload.content} />
            );
          })}
        </div>
      );
    }
  }
}

export default MessageList;
