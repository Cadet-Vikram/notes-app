import { ADD_NOTE, DELETE_NOTE, LOGOUT } from './actions';

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case DELETE_NOTE:
  return {
    ...state,
    notes: state.notes.filter((note) => note.id !== action.payload),
  };

     case LOGOUT:
      return {
        ...state,
        notes: [],
      };  
     case 'TOGGLE_PIN': {
  const pinnedCount = state.notes.filter(note => note.pinned).length;
  return {
    ...state,
    notes: state.notes.map(note =>
      note.id === action.payload
        ? { ...note, pinned: !note.pinned && pinnedCount < 3 }
        : note
    ),
  };
}
 
    default:
      return state;
  }
};

export default notesReducer;
