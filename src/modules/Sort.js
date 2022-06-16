const sort = (data) => {
  data.sort((a, b) => {
    return b.score - a.score;
  });
  return data;
};

module.exports = sort;
