import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const animalCategorySchema = new Schema({
  acid: { type: Number, required: true },
  animalname: { type: String, required: true },
  animaldescription: { type: String, required: true },
  
});

const AnimalCategory = model('AnimalCategory', animalCategorySchema);

export default AnimalCategory;