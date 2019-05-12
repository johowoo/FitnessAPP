export const fuzzySearch = (predicate, terms, prop) => {
  const outcomeArray = [];
  for (let i = 0; i < terms.length; i++) {
    const outCome = search(predicate, terms[i].data, prop);
    if (outCome.length) {
      outcomeArray.push(...outCome);
    }
  }
  return outcomeArray;
};

const search = (predicate, terms, prop) => {
  const wordsToMatch = predicate.trim().toLowerCase().split(' ');
  return terms.filter((term) => {
    const currentTerm = term.toLowerCase();
    return Boolean(wordsToMatch.filter(word => (
      currentTerm.includes(word)
    )).length);
  });
};
