const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, authLogin: action.payload };

    case 'REGISTER':
      return { ...state, authLogin: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    default:
      throw new Error('No matched action!');
  }
};

export default Reducer;
