import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, 'Name need to be longer than 4!'],
      maxlength: [25, 'Name need to be shorter than 25!'],
    },
    category: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      }
    ],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Description need to be longer!'],
      maxlength: [50, 'Description need to be shorter!'],
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: String,
        trim: true,
      }
    ],
    coordinate: {
      latitude: String,
      longitude: String,
    }
  }
);

export default mongoose.model('Product', ProductSchema);
