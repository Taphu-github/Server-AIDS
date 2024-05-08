import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const animalSchema = new Schema({
  acid: { type: Number, required: true },
  sid: { type: Number, required: true },
  animalname: { type: String, required: true },
  enroachTime: { type: String, required: true },
  enroachDate: { type: Date, required: true },  
  animalCount: {type: Number, required: true },
});

const Animal = model('Animal', animalSchema);

export default Animal;