import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priceLinux: {
    type: Number,
  },
  priceWindows: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  techStack: {
    type: String,
  },
  windowsBuyLink: {
    type: String,
  },
  linuxBuyLink: {
    type: String,
  },
});

const Product = models.Product || model('Product', productSchema);

export default Product;
