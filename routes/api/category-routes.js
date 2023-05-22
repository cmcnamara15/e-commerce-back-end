const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ]
  }).then((data) => {res.send(data);});
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id)
  
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.post("/", (req, res) => {
  Category.create(req.body).then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    Where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  console.log(req.params);
  Category.destroy({ where: { id: req.params.id } }).then((data) => {
    res.sendStatus(200);
  });
});

module.exports = router;
