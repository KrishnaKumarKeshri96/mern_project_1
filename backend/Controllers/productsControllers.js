const getAllProducts = (req, res) => {
  res.status(200).json({ products: "yes" });
};

export { getAllProducts };
