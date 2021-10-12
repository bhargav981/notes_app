import React from 'react';
import axios from 'axios';
import './App.css';

class Edit extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        title: this.props.match.params.title,
        body: '',
        tags: null,
        newTag: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this)
      this.updateNote = this.updateNote.bind(this)
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/info/${this.state.title}`)
    .then((results) => this.setState({
      body: results.data[0].body,
      tags: results.data[0].tags
    }))
    .catch(err => {
      console.error(err);
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  uptags = (title,tag) => {
    const body = this.state.body
    let tagsToKeep = this.state.tags.split(',').filter((ntag) => ntag !== tag).toString()
    if(tagsToKeep === ''){
      tagsToKeep = null
    }
    const ndata = {
      body,
      tags: tagsToKeep
    };
    
    axios
      .put(`http://localhost:5000/update/${title}`, ndata) 
      .then(() => {
        axios.get(`http://localhost:5000/info/${this.state.title}`)
        .then((results) => this.setState({
          body: results.data[0].body,
          tags: results.data[0].tags
        }))
        .catch(err => {
          console.error(err);
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  updateNote = (title) => {
    const {body,newTag,tags} = this.state;
    let ntags
    if(tags === null){
      if(newTag === ''){

      }else{
        ntags = newTag
      }
    }else{
      if(newTag !== ''){
        ntags = tags+','+newTag
      }
    }
    const ndata = {
      body,
      tags: ntags
    };
    axios
      .put(`http://localhost:5000/update/${title}`, ndata) 
      .then(() => console.log('Note Updated'))
      .catch(err => {
        console.error(err);
      });
  }

  render(){
    const ntitle = this.state.title
    let displayTags
    if(this.state.tags === null) {
      displayTags = <div className="box"><label> No Tags </label> </div>
    }
    else{
      displayTags = this.state.tags.split(',').map(tag => 
        <div className="uptag">
          <div className="box">
          {tag} 
          </div>
          <button className="deltag" onClick={() => {this.uptags(ntitle,tag)}}>
            Delete
          </button>
        </div>      
      )
    }
    
    return(
      <div>
        <div className="titles">
        <h1>Edit Note</h1>
        </div>
        <div className="addNote">
          <form onSubmit={this.updateNote}>
            <label> {ntitle} </label>
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
              placeholder="New Tags"
              type="text"
              name="newTag"
              value={this.state.newTag}
              onChange={this.handleInputChange}
            />
            <br/>
            <div className="element2">
              {displayTags}
            </div>
            <br/>
            <button 
              className="clibox"
              type="submit"
              onClick={()=>{ this.updateNote(ntitle); this.nextPath("/home") }}> 
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

}
export default Edit;