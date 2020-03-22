export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'get_history':
      return payload;
    default:
      return state;
  }
};
