import mongoose, { Schema } from 'mongoose';

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  attending: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  family: {
    type: String,
    enum: ['mom', 'dad'],
    required: true,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

attendeeSchema.index({ name: 'text' });
const Attendee = mongoose.model('Attendee', attendeeSchema);

export default Attendee;
