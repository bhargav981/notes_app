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
    const renderNotes = this.state.notes.map(note => {
      let displayTags
      if (note.tags === null ){
        displayTags = <div className="box"><label> No Tags </label> </div>
      }else {
        displayTags = note.tags.split(',').map(tag => <div className="box"> {tag} </div>)
      }
      return  <div className="yournote">
                <div className="mynote">
                  <div className="element" >
                    <label>Title: </label>
                    {note.title}
                  </div>
                  <div className="element">
                    <label>Body: </label>
                    {note.body}
                  </div>
                  <div className="element2">
                    <div className="labe">
                      <label>Tags: </label>
                    </div>
                    {displayTags}
                  </div>
                </div>
                <button className="clibox" onClick={() => this.nextPath(`/update/${note.title}`)}>
                  Edit
                </button>
                <button className="clidel" onClick={() => this.deleteNote(note.title)}>
                  Delete
                </button>
              </div>
      
    })
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
          <form onSubmit={this.addNote} className="newNote">
            <div>
              <label> Add Notes </label>
            </div>
            <br/>
            <div className="required">
              <label>Title: </label>
              <input
                placeholder="Note Title"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>
            <br/>
            <div className="required">
              <label>Body: </label>
              <input
                placeholder="Note Body"
                type="text"
                name="body"
                value={this.state.body}
                onChange={this.handleInputChange}
            />
            </div>
            <br/>
            <div className="normal">
              <label>Tags:</label>
              <input
                placeholder="Provide CSV"
                type="text"
                name="tags"
                value={this.state.tags}
                onChange={this.handleInputChange}
              />
            </div>
            <br/>
            <div className="form-button">
              <button 
                className="clibox"
                type="submit"
                onClick={this.addNote}> 
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
