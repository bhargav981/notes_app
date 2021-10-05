import React from 'react';
import axios from 'axios';

class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          body: '',
          tags: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.updateNote = this.updateNote.bind(this)
    }

    nextPath(path) {
      this.props.history.push(path);
    }

    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    updateNote = title => {
      const { body, tags } = this.state;
      const ndata = {
        body,
        tags
      };
      axios
        .put(`http://localhost:5000/update/${title}`, ndata) 
        .then(() => console.log('Note Updated'))
        .catch(err => {
          console.error(err);
        });
    };

    render(){
        return(
          <div>
            <div className="titles">
            <h1>Edit Note</h1>
            </div>
            <div className="addNote">
              <form onSubmit={this.updateNote}>
                <label> {this.props.match.params.title} </label>
                <br/>
                <input
                  placeholder="New Body"
                  type="text"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleInputChange}    
                />
                <br/>
                <input
                  placeholder="New tag"
                  type="text"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.handleInputChange}
                />
                <br/>
                <button 
                  className="clibox"
                  type="submit"
                  onClick={()=>{ this.updateNote(this.props.match.params.title); this.nextPath("/home") }}> 
                  Submit
                </button>
              </form>
            </div>
          </div>
        )
    }
}
export default Edit;