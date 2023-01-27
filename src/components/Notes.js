import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = (props) => {
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const ref = useRef(null);
  const clsoseRef = useRef(null);
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    clsoseRef.current.click();
    showAlert("Note updated successfully", "success");
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      edescription: currentNote.description,
      etitle: currentNote.title,
      etag: currentNote.tag,
    });
  };
  return (
    <>
      <AddNote showAlert={showAlert} />
      <form className="my-3">
        <button
          type="button"
          className="btn btn-primary d-none"
          ref={ref}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    required
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    required
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={clsoseRef}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={
                    note.edescription.length < 5 || note.etitle.length < 5
                  }
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes Found, please type some notes"}
        </div>
        {notes?.map((note) => {
          return (
            <NoteItem
              note={note}
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
