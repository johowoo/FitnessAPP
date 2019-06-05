export const validation = ({ max = 100, min = 0, value = 0 }) =>
  value >= min && value <= max;
