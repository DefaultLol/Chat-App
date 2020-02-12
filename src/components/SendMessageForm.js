import React from 'react';

class SendMessageForm extends React.Component{
  constructor(){
    super();
    this.state={
      message:''
    }
  }
  handleChange=(e)=>{
    this.setState({
      message:e.target.value
    });
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message:''
    })
  }
  render(){
    return(
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input
          disabled={!this.props.disabled}
          value={this.state.message}
         onChange={this.handleChange} placeholder="Type youre message and hit Enter" type="text" className="enter-message" />
      </form>
    );
  }
}

export default SendMessageForm;
