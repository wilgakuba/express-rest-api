const Concert = require('../models/concerts.model');
const uuid = require('uuid');
var sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concert.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = sanitize(req.body);
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getAllByPerformer = async (req, res) => {
  try {
    const dep = await Concert.find({ performer: req.params.performer });
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.getAllByGenre = async (req, res) => {
  try {
    const dep = await Concert.find({ genre: req.params.genre });
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAllByPrice = async (req, res) => {
  try {
    const dep = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max },});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAllByDay = async (req, res) => {
  try {
    const dep = await Concert.find({ day: req.params.day });
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};