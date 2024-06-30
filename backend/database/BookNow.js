const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceTakerId: String,
  serviceTakerName: String,
  serviceTakerPhone: Number,
  serviceTakerImage: String,
  serviceProviderId: String,
  serviceProviderName: String,
  serviceProviderPhone: Number,
  serviceProviderImage: String,
  date:String,
  time:String,
  category: String,
  address: String,
  description: String,
  currentStatus: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
