import { Schema, SchemaTypes, model, Document, PaginateModel } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';
import { roles } from '../config/roles';

const { String } = SchemaTypes;

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
}

interface IUserDocument extends IUser {
  isPasswordMatch(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true // used by the toJSON plugin
    },
    avatar: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      enum: roles,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(paginate);

/**
 * Check if password matches the user's password
 *
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = model<IUserDocument, PaginateModel<IUserDocument>>('User', userSchema);

export default User;
