import React from 'react'
import ReactDOM from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'
import TypeMessage from '../components/TypeMessage'

import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/xml'
import 'brace/mode/ruby'
import 'brace/mode/sass'
import 'brace/mode/markdown'
import 'brace/mode/mysql'
import 'brace/mode/json'
import 'brace/mode/html'
import 'brace/mode/handlebars'
import 'brace/mode/golang'
import 'brace/mode/csharp'
import 'brace/mode/elixir'
import 'brace/mode/typescript'
import 'brace/mode/css'

import 'brace/theme/monokai'


class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      room: props.room,
      readOnly: false,
      mode: props.mode,
      username: ''
    }
  }

  handleChange = (code) => {
    if(this.state.readOnly) return 
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.room._id !== this.props.room.id) {
      console.log('Room next:', nextProps.room.name, "Room this:", this.state.room.name)
      this.setState({room: nextProps.room})
    }
  }

  update(data) {
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

    setTimeout(() => {
      this.setState({readOnly: false})
    }, 1000)
  }

  render () {
    const options = { lineNumbers: true, mode: this.state.mode, readOnly: this.state.readOnly }
    const typingMessage = (this.state.readOnly) ? <TypeMessage username={this.state.username} /> : <p></p>
    return (  
      <div className='editor-div'>
        <AceEditor
           className='ace-editor'
           mode={this.props.mode}
           height='800px'
           width='600px'
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
    )
  }
}

export default Editor