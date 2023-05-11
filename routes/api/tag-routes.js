const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../Develop/models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    raw: true
  }).then((data) => {
    res.send(data);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id)
  .then((data) => {
    res.json(data);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(data => {
    res.send(data);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where:{id:req.params.id}}).then(data => {
    res.sendStatus(200)
  })
});

module.exports = router;
