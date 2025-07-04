import React, { useEffect, useState } from 'react';
import { MdPushPin } from "react-icons/md";

function NoteItem({ title, description, onDelete, onTogglePin, pinned }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = () => {
    setVisible(false);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <div
      className="card p-3 border-0 shadow-sm note-item-animated"
      style={{
        width: '18rem',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}
    >
      <button
        onClick={onTogglePin}
        title={pinned ? 'Unpin' : 'Pin'}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.2rem',
          color: pinned ? 'gold' : '#555',
          cursor: 'pointer'
        }}
      >
        <MdPushPin />
      </button>

      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          border: 'none',
          background: 'transparent',
          fontSize: '1.3rem',
          cursor: 'pointer',
          color: '#555'
        }}
        aria-label="Delete note"
      >
        &times;
      </button>

      <h5
        style={{
          color: 'rgb(19, 59, 110)',
          fontFamily: 'Roboto Slab, serif',
          wordBreak: 'break-word',
          paddingTop: '28px'
        }}
      >
        {title}
      </h5>

      <p
        style={{
          fontFamily: 'Roboto Slab, serif',
          color: '#333',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default NoteItem;
