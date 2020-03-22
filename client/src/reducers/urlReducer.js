export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'get_url':
      return payload;
    default:
      return state;
  }
};
