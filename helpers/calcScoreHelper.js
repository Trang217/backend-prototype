exports.getScore = (badges) => {
    const total = badges.map((el) => el.score);
    const sum = total.reduce((a, b) => a + b);
    return sum;
  };