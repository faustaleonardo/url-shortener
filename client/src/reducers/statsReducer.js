export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'get_stats':
      return payload;
    default:
      return state;
  }
};
