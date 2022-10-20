const { Schema, SchemaTypes, model } = require('mongoose');

const {
  String, Date, Boolean, ObjectId
} = SchemaTypes;

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['refresh', 'resetPassword'],
      required: true
    },
    expires: {
      type: Date,
      required: true
    },
    blacklisted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Token = model('Token', tokenSchema);

module.exports = {
  Token
};
