const { Schema, model } = require('mongoose')

const TradeSchema = new Schema({
  total: {
    type: Number,
    required: [true, 'This field is required']
  },
  ticket: {
    type: String,
    required: [true, 'This field is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'This field is required']
  },
  parking: {
    type: Schema.Types.ObjectId,
    required: [true, 'This field is required']
  }
},
{
  timestamps: true
})

TradeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.updatedAt
  }
})

const Trade = model('Trade', TradeSchema)

module.exports = Trade
