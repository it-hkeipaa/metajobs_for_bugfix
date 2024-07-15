import mongoose from 'mongoose'

export interface CategoryDocument extends mongoose.Document {
  status: {
    isFeatured: boolean
    isActive: boolean
  }
  categoryTitle: string
  subCategory: [string]
  avatar: string
  iconUrl: string
}

const categorySchema = new mongoose.Schema({
  status: {
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  categoryTitle: {
    type: String,
    required: true,
    unique: true,
  },
  subCategory: [
    {
      type: String,
    },
  ],
  avatar: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
})

const CategoryModel =
  mongoose.model<CategoryDocument>('Category', categorySchema) ||
  mongoose.models.Category

export default CategoryModel
