export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE'; 
export const LOGOUT = 'LOGOUT';

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const deleteNote = (index) => ({
  type: DELETE_NOTE,
  payload: index,
});

export const logout = () => ({
  type: LOGOUT,
});

export const togglePin = (id) => ({
  type: 'TOGGLE_PIN',
  payload: id,
});

