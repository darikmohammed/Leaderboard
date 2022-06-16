const sort = (data) => {
  data.sort((a, b) => b.score - a.score);
  return data;
};

module.exports = sort;
