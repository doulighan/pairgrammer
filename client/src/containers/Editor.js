
import React from 'react'
import ReactDOM from 'react-dom'
import brace from 'brace';
import AceEditor from 'react-ace';
import TypeMessage from '../components/TypeMessage'

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/monokai';


class Editor extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.room)
    this.state = {
      room: props.room,
      readOnly: false,
      mode: 'javascript',
      username: '',
    }
  }

  handleChange = (code) => {
    let cursor = this.refs.ace.editor.selection.getCursor()
    this.props.socket.emit('codeUpdate', {
      id: this.props.room._id,
      code: code,
      user: {
        name: this.props.user.username,
        id: this.props.user.id,
        cursor: this.props.cursor
      }
    })
  }

  update(data) {
    console.log('data in:', data)
    this.setState({ 
      room: {...this.state.room, code: data}
    })
  }

  componentDidMount() {
    this.props.socket.on('codeUpdate', (data) => this.update(data))
    this.props.socket.on('blockInput', (user) => this.blockInput(user))
  }

  blockInput(user) {
    console.log(user.name, 'is typing...')
    this.setState({readOnly: true, username: user.name})
    this.refs.ace.editor.setReadOnly(true)
    setTimeout(() => {
      this.refs.ace.editor.setReadOnly(false)
      this.setState({readOnly: false})
    }, 1000)
  }

  render () {
    const options = { lineNumbers: true, mode: this.state.mode, readOnly: this.state.readOnly }
    const typingMessage = (this.state.readOnly) ? <TypeMessage username={this.state.username} /> : <p></p>
    return (  
      <div>
        <div>
        <AceEditor
           className='ace-editor'
           mode="javascript"
           height='800px'
           width='1000px'
           fontSize='14px'
           theme='monokai'
           ref="ace"
           onChange={this.handleChange}
           value={this.state.room.code}
           name="UNIQUE_ID_OF_DIV"
           editorProps={{$blockScrolling: true}}
         />
        {typingMessage}
      </div>
    </div>
    )
  }
}

export default Editor