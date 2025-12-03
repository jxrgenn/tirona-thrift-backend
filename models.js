const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  description: String,
  tags: [{ type: String }],
  size: String,
});

// Transform _id to id for frontend compatibility
ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
  }
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  items: Array,
  total: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'SHIPPED', 'DELIVERED'], default: 'PENDING' }
});

OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
  }
});

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  Order: mongoose.model('Order', OrderSchema)
};