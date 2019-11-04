import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  mongoose.Schema({
    owner: {
      type: mongoose.Schema.types.ObjectId,
      ref: 'User'
    },
    title: String,
    description: String,
    image: String,
    price: String,
    created: {
      type: Date,
      default: Date.now
    }
  })
})