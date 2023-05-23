const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: Product
  })
  .then((results) => {
    res.json(results)
  })
});


router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: Product
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then((data) => {
    res.json(data);
  })
})

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
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
  Category.destroy({ 
    where: { 
      id: req.params.id 
    }
    }).then((data) => {
    res.json(data);
  })
});

module.exports = router;
