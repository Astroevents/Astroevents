const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssistantSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  eventID: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  }
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

 const Assistant = mongoose.model('Assistant', AssistantSchema);

 module.exports = Assistant;
