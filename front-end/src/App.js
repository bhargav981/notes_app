import React from 'react';
import axios from 'axios';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      notes : [],
      title: '',
      body: '',
      tags: '',
    };
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

    axios
      .post('http://localhost:5000/addNotes', notes)
      .then(() => console.log('Note Created'))
      .catch(err => {
        console.error(err);
      });
  };

  deleteNote = title => {
    axios
      .delete(`http://localhost:5000/delete/${title}`) 
      .then(() => console.log('Note Deleted'))
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount()
  {
    axios.get('http://localhost:5000/notes').then((notes)=> this.setState({notes:notes.data}));

  }

  render(){
    const renderNotes = this.state.notes.map(note => 
    <div>
      {note.title}
      <button onClick={() => this.deleteNote(note.title)}>Delete</button>
    </div>
    )
    return(
      <div>
        {renderNotes}  
          <div>
            <form addNote={this.addNote}>
              Title: <br></br>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Note Title"
                    onChange={this.handleInputChange}
                />
              <br/>
              Body: <br></br>
                <input
                      type="text"
                      name="body"
                      placeholder="Note Body"
                      onChange={this.handleInputChange}
                />
              <br/>
              Tags: <br></br>
                <input
                      type="text"
                      name="tags"
                      placeholder="Note Tags"
                      onChange={this.handleInputChange}
                />
              <br/>
              <button className="button" onClick={this.addNote}> 
              Submit
              </button>
            </form>
          </div>
      </div>
    )
  }
}

export default App;
