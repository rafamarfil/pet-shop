export const generateId = () => {
  return new Date().getTime() * Math.random() * 100000;
};
