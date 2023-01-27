import React, { useContext,useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
  const {addNote } = context;
const [note, setNote] = useState({
    title:'',
    description:'',
    tag:''
})
  const handleClick = (event)=>{
    event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:'',
    description:'',
    tag:''})
    props.showAlert("Note added successfully","success")
}

const onChange = (event)=>{
    setNote({...note,[event.target.name]:event.target.value})
}

  return (
    <div>
      <h2>Add new Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            required
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            required
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            required
            onChange={onChange}
          />
        </div>
      </form>
      <button type="submit" className="btn btn-primary" disabled={note.description.length<5||note.title.length<5} onClick={handleClick}>
          Add Note
        </button>
    </div>
  );
};

export default AddNote;
