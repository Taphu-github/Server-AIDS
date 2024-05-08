import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const systemSchema = new Schema({
  sid: { type: Number, required: true },
  sysname: { type: String, required: true },
  location: { type: Number, required: true },
  type: { type: String, required: true },
  cid: { type: String, required: true },

  
});

const System = model('System', systemSchema);

export default System;