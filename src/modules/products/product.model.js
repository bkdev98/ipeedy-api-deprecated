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
      type: Schema.Types.ObjectId,
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
  this._categorify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = slug(`${this.name}-${this._id}`);
  },
  _categorify() {
    this.category = new mongoose.mongo.ObjectId(this.category);
  },
};

ProductSchema.statics = {
  createProduct(args, user) {
    return this.create({
      ...args,
      category: mongoose.Types.ObjectId(args.category),
      user,
    });
  },
  async findByCategory(id) {
    const products = await this.find({ category: id });

    return products;
  },
};

export default mongoose.model('Product', ProductSchema);
