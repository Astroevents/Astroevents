
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  place: String,
  city: String,
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  coordenades: {
    lat: Number,
    long: Number
  },
  date: {
    type: Date,
    default: new Date()
  },
  imageUrl: {
    type: String,
    default: "http://conceptodefinicion.de/wp-content/uploads/2015/01/Astronomia.jpg" },
  description: String,
  category: {
    type: String,
    // enum: ["cielo profundo", "sitema solar", "luna", "unknown"],
    default: "unknown"
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
