import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, logout, togglePin } from '../redux/actions';
import NoteItem from './NoteItem.jsx';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Notes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalFadeOut, setModalFadeOut] = useState(false);
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.background = 'linear-gradient(to bottom right, #B09299, #9C7DA7, #5E3D8D)';
  }, []);

  const handleTogglePin = (id) => {
    const note = notes.find(note => note.id === id);
    const pinnedCount = notes.filter(note => note.pinned).length;

    if (!note.pinned && pinnedCount >= 3) {
      alert('You can only pin up to 3 notes.');
      return;
    }

    dispatch(togglePin(id));
  };

  const handleAddNote = () => {
    if (title.trim() === '' && description.trim() === '') {
      setShowModal(true);
      return;
    }
    if (title.trim() === '' || description.trim() === '') {
      setShowModal(true);
    }

    dispatch(addNote({ id: Date.now(), title, description, pinned: false }));
    setTitle('');
    setDescription('');
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCloseModal = () => {
    setModalFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      setModalFadeOut(false);
    }, 350);
  };

  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: '32px',
          marginBottom: '32px'
        }}
      >
        <h2
          className="text-center mb-0"
          style={{
            color: 'rgb(241, 244, 248)',
            fontFamily: "Roboto Slab, serif",
            flex: 1,
            textAlign: 'center',
            margin: 0
          }}
        >
          Notes
        </h2>
        <button
          className="btn btn-danger"
          onClick={handleLogout}
          style={{
            fontFamily: "Roboto Slab, serif",
            color: 'white',
            borderRadius: '3px',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <MdOutlineLogout className="me-2" />Logout
        </button>
      </div>

      <div className="card p-3 mb-4 border-0 shadow-lg d-flex flex-column gap-2" style={{ width: '100%', maxWidth: 600 }}>
        <input
          style={{ fontFamily: 'Roboto Slab, serif' }}
          type="text"
          placeholder="Title"
          value={title}
          className="form-control mb-2 border-0 shadow-sm"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{ fontFamily: 'Roboto Slab, serif' }}
          placeholder="Take a Note..."
          value={description}
          className="form-control mb-2 border-0 shadow-sm"
          rows="3"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="btn align-self-end"
          style={{
            backgroundColor: 'rgb(8, 88, 173)',
            color: 'white',
            width: '80px',
            borderRadius: '3px',
            fontFamily: "Roboto Slab, serif"
          }}
          onClick={handleAddNote}
        >
          Add
        </button>
      </div>

      <div
        className="notes-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '1000px',
          padding: '20px',
          justifyContent: 'center',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {[...notes]
          .sort((a, b) => (b.pinned === true) - (a.pinned === true))
          .map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              description={note.description}
              pinned={note.pinned}
              onDelete={() => handleDeleteNote(note.id)}
              onTogglePin={() => handleTogglePin(note.id)}
            />
          ))
        }
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="custom-modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            pointerEvents: 'all',
          }}
        >
          <div
            className={`custom-modal-dialog ${modalFadeOut ? 'animated-modal-out' : 'animated-modal-in'}`}
            style={{
              width: '90%',
              maxWidth: '500px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1rem',
              zIndex: 10000,
              display: 'block'
            }}
          >
            <div className="modal-content p-3" style={{ fontFamily: "Roboto Slab, serif" }}>
              <div className="modal-header">
                <h5 className="modal-title">Note Tip</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} />
              </div>
              <div className="modal-body">
                <p>
                  It's a good practice to add both a <strong>title</strong> and <strong>description</strong> when taking notes.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Notes;
