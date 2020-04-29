export default (state = null, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'fetch_user':
      return payload || false;
    case 'login':
      return payload || false;
    case 'signup':
      return payload || false;
    default:
      return state;
  }
};
