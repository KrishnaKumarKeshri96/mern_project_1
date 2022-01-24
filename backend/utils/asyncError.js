export default (ErrorAsync) => (req, res, next) => {
  Promise.resolve(ErrorAsync(req, res, next)).catch(next);
};
