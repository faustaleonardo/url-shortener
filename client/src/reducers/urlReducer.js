export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'post_url':
      return payload;
    default:
      return state;
  }
};
