export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'get_track':
      return payload;
    default:
      return state;
  }
};
