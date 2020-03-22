export default (state = null, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'get_error':
      return payload || false;
    case 'clear_error':
      return payload;
    default:
      return state;
  }
};
