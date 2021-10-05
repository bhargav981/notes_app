import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      notes : [],
      title: '',
      body: '',
      tags: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addNote = (e) => {
    e.preventDefault();
    const { title, body, tags } = this.state;

    const notes = {
      title,
      body,
      tags
    };

    axios.post('http://localhost:5000/addNotes', notes)
      .then(() => {
        this.setState({
          title: '',
          body: '',
          tags: ''
        })
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
      axios.get('http://localhost:5000/notes').then((notes)=> this.setState({notes:notes.data}))
      });
  };

  deleteNote = title => {
    // const currentNotes = this.state.notes
    // this.setState({
    //   notes: currentNotes.filter(note => note.title !== title) 
    // });
    axios
      .delete(`http://localhost:5000/delete/${title}`) 
      .then(() => {
        axios.get('http://localhost:5000/notes').then((notes)=> this.setState({notes:notes.data}))
      })
      .catch(err => {
        console.error(err);
      });
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/notes').then((notes)=> this.setState({notes:notes.data}));
  }

  render(){
    const renderNotes = this.state.notes.map(note => 
    <div className="yournote">
        <div className="mynote">
          <div className="element" >
            Title: <bt/>
            {note.title}
          </div>
          <div className="element">
            Body: <bt/>
            {note.body}
          </div>
          <div className="element">
            Tags: <bt/>
            {note.tags}
          </div>
        </div>
        <button className="clibox" onClick={() => this.nextPath(`/update/${note.title}`)}>
          Edit
        </button>
        <button className="clidel" onClick={() => this.deleteNote(note.title)}>
          Delete
        </button>
    </div>
    )
    return(
      <div>
        <div className="titles">
          <h1>Your Notes</h1>
        </div>
        <div className="allNotes">
          {renderNotes} 
        </div>
        <br/>
        <div className="addNote">
          <form onSubmit={this.addNote}>
            <label> Add Notes </label>
            <br/>
            <input
              placeholder="Note Title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <br/>
            <input
              placeholder="Note Body"
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleInputChange} 
            />
            <br/>
            <input
              placeholder="Note Tags"
              type="text"
              name="tags"
              value={this.state.tags}
              onChange={this.handleInputChange}
            />
            <br/>
            <button 
              className="clibox"
              type="submit"
              onClick={this.addNote}> 
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
