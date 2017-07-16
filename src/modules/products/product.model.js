import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, 'Name need to be longer than 4!'],
      maxlength: [25, 'Name need to be shorter than 25!'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    images: [
      {
        type: String,
        trim: true,
      },
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
      },
    ],
    geometry: GeoSchema,
  },
  {
    timestamps: true,
  },
);

ProductSchema.pre('validate', function(next) {
  this._slugify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = slug(`${this.name}-${this._id}`);
  },
};

ProductSchema.statics = {
  createProduct(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

export default mongoose.model('Product', ProductSchema);
