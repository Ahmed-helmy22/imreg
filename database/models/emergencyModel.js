import mongoose from 'mongoose';
const emergencySchema = new mongoose.Schema(
  {
    emergencyText: {
      type: String,
    },
    emergencyVideo :{type: String},
    emergencyPhoto : {type: String},
    emergencyRecord : {type: String},
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    lat: {
      type: Number,
      required : true
    },
    long: {
      type: Number,
      required : true
    },
  },

  {
    timestamps: true,
  }
);

const emergency = mongoose.model('Emergency', emergencySchema);

export default emergency;
