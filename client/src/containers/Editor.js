import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
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
        cursor: this.props.cursor,
        color: this.props.color
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.room._id !== this.props.room.id) {
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
    if(this.state.readOnly) return
    this.setState({readOnly: true, user: user})

    setTimeout(() => {
      this.setState({readOnly: false})
    }, 1000)
  }

  render () {
    const debug = false

    const options = { lineNumbers: true, mode: this.state.mode, readOnly: this.state.readOnly }
    const typingMessage = (this.state.readOnly) ? <TypeMessage user={this.state.user} /> : <p></p>

    if(debug) {
      return (<div className='debug'>DEBUG</div>)
    } else {
        return ( 
          <div className='editor-div'>
            <AceEditor
               className='ace-editor'
               mode={this.state.room.mode}
               height='800px'
               width='1100px'
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
        )}
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user,
    color: state.color,
    permitted: state.permitted
  }
}


export default connect(mapStateToProps, null)(Editor)