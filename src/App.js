import React from 'react';
import './App.css';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      roomId:null,
      messages:[],
      joinableRooms:[],
      joinedRooms:[]
    }
  }
  componentDidMount(){
    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/61422c82-122b-4266-b4f2-442b08133414/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:61422c82-122b-4266-b4f2-442b08133414",
      userId: "Tarik",
      tokenProvider: tokenProvider
    });

    chatManager
    .connect()
    .then(currentUser => {
      this.currentUser=currentUser;
      this.getRooms();
    })
    .catch(error => {
      console.error("error:", error);
    });
  }

  getRooms=()=>{
    this.currentUser.getJoinableRooms().then(joinableRooms=>{
      this.setState({
        joinableRooms,
        joinedRooms:this.currentUser.rooms
      });
    })
  }

  suscribeToRoom=(roomId)=>{
    this.setState({
      messages:[]
    });
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages:[...this.state.messages,message]
          })
        }
      }
    })
    .then(room=>{
      this.setState({
        roomId:roomId
      });
      this.getRooms();
    })
  }

  sendMessage=(text)=>{
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    });
  }

  createRoom=(name)=>{
    this.currentUser.createRoom({
      name
    })
    .then(room =>{
      this.suscribeToRoom(room.id);
    })
  }

  render(){
    console.log(this.state.messages);
    return(
      <div className="container">
        <div className="grid-item">
          <RoomList roomId={this.state.roomId} suscribeToRoom={this.suscribeToRoom} rooms={[...this.state.joinedRooms,...this.state.joinableRooms]} />
          <NewRoomForm createRoom={this.createRoom} />
        </div>
        <div className="grid-item">
          <MessageList roomId={this.state.roomId} messages={this.state.messages} />
          <SendMessageForm disabled={this.state.roomId} sendMessage={this.sendMessage} />
        </div>
      </div>
    )
  }
}

export default App;
