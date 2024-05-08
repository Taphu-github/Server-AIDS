import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const ownerSchema = new Schema({
  cid: { type: Number, required: true },
  ownername: { type: String, required: true },
  contactNo: { type: String, required: true },
  emailID: { type: String, required: true },
  
});

const Owner = model('Owner', ownerSchema);

export default Owner;