export const validation = ({ max = 100, min = 0, value = 0 }) => {
  if (value >= min && value <= max) {
    return true;
  }
  return false;
};
