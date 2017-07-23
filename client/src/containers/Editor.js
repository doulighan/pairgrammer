import React from 'react'
import ReactDOM from 'react-dom'
import CodeMirror from 'react-codemirror'

import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js'

import brace from 'brace';
import AceEditor from 'react-ace';

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
      mode: 'javascript'
    }
  }

  handleChange = (code) => {
    console.log('handlechange:', code)
    let cursor = this.refs.ace.editor.selection.getCursor()
    this.props.socket.emit('codeUpdate', {
    room: this.props.room.id,
    code: code
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
  }

  render () {
    const options = { lineNumbers: true, mode: this.state.mode, readOnly: this.state.readOnly }
    return (  
      <AceEditor
         mode="javascript"
         theme="monokai"
         ref="ace"
         onChange={this.handleChange}
         value={this.state.room.code}
         name="UNIQUE_ID_OF_DIV"
         editorProps={{$blockScrolling: true}}
       />
    )
  }
}

export default Editor