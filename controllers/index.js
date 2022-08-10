const Item = require('../models/item')

//Create
const createItem = async (req, res) => {
  try {
    const item = await new Item(req.body)
    await item.save()
    return res.status(201).json({item})
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Read
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
    return res.status(200).json({ items })
  }
  catch (error) {
    return res.status(500).send(error.message)  
  } 
}

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (item) {
      return res.status(200).json({ item });
    }
    return res.status(404).send('Item with the specified ID does not exist')
  }
  catch (error) {
    return res.status(500).send(error.message) 
  }
}

//Update
const updateItem = (req, res) => { //don't make async, will make a lot of errors...technically backend doesn't need async
  try {
    const { id } = req.params;
    Item.findByIdAndUpdate(id, req.body, { new: true }, (err, item) => {
      if (err) {
        res.status(500).send(err) 
      }
      if (!item) {
        res.status(500).send('Item not found') 
      }
    })
  }
  catch (error) {
    return res.status(500).send(error.message) 
  }
}

//Delete
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id)
    if (deleted) { //if something gets deleted
      return res.status(200).send("Item deleted")
    }
    throw new Error("Item not found");
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = { //export all these files
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
}