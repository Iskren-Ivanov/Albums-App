const guid = () => {
  const x = 'xxxyy'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 8) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(8);
  });
  return parseInt(x);
};

export default guid;
