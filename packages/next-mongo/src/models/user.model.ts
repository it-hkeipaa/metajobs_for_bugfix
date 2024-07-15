import mongoose from 'mongoose'
// eslint-disable-line

import { PackageDocument } from './package.model'

export interface UserDocument extends mongoose.Document {
  fullName: {
    firstName: string
    lastName: string
  }
  email: string
  password: string
  isConfirmed: boolean
  package: PackageDocument['_id']
  resetLink: string
  avatar: string
  cloudinary_id: string
  role: {
    isCandidate: boolean
    isEmployer: boolean
    isAdmin: boolean
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

// export interface UpdateUserDocument extends mongoose.Document {
//   phoneNumber: string
//   aboutMe: string
// }

export const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    resetLink: {
      data: String,
      default: '',
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    role: {
      isCandidate: {
        type: Boolean,
      },
      isEmployer: {
        type: Boolean,
      },
      isAdmin: {
        type: Boolean,
      },
    },
  },
  {
    timestamps: true,
  }
)

// const updateUserSchema = new mongoose.Schema({
//   phoneNumber: {
//     type: String,
//   },
//   aboutMe: {
//     type: String,
//   },
// })

// userSchema.pre('save', async function (next) {
//   let user = this as UserDocument

//   const SALT_NUMBER = process.env.SALT_NUMBER || 10

//   if (!user.isModified('password')) {
//     return next()
//   }

//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hashSync(user.password, salt)

//   user.password = hash
// })

// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<Boolean> {
//   const user = this as UserDocument
//   const isMatch = await bcrypt
//     .compare(candidatePassword, user.password)
//     .catch((e) => false)
//   return isMatch
// }

// const userUpdatedSchema = userSchema.add(updateUserSchema)

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
