const mongoose = require("mongoose");
const db = require("../config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");
const AvailableCrop = require("../models/AvailableCrop");
const InProgressCrop = require("../models/InProgress");
////////////////////////////REMOVE DISCONNECT//////////////////////////////
async function findListings(Model) {
  for await (const doc of Model.find()) {
    console.log(doc);
  }
  // mongoose.disconnect(() => {
  //   console.log("END");
  // });
}

//findListings(Farmer);

// /*ADD FARMER AND BUYER*/
// function addItem(item) {
//   item
//     .save()
//     .then(() => {
//       console.log("SAVED");
//       mongoose.disconnect(() => {
//         console.log("END");
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       mongoose.disconnect(() => {
//         console.log("END");
//       });
//     });
// }
// var farmer = new Farmer({
//   name: "Vikram",
//   email: "abcd",
//   password: "abc",
// });
// var buyer = new Buyer({
//   name: "Sid",
//   email: "abcdef",
//   password: "abcfe",
// });
// addItem(farmer);
// console.log(farmer);

// addItem(buyer);
// console.log(buyer);

// //Create crop
// function addListing(farmer, cropName, cropQuantity) {
//   var listing = new AvailableCrop({
//     name: cropName,
//     seller: farmer._id,
//     quantity: cropQuantity,
//   });
//   addItem(listing);
//   return Promise.resolve(listing);
// }

// async function confirmOrder(buyer, order) {
//   AvailableCrop.deleteOne(order).then(() => {
//     console.log("deleted!");
//   });
//   var inProgress = new InProgressCrop({
//     name: order.name,
//     seller: order.seller,
//     buyer: buyer._id,
//     quantity: order.quantity,
//   });
//   addItem(inProgress);
//   var farmer = await Farmer.findById(inProgress.seller);

//   console.log(
//     "Buyer: " + buyer.name + "\n" + "Farmer: " + farmer.name.toString() + "\n"
//   );
// }

// addListing(farmer, "WEED", "69g").then((order) => confirmOrder(buyer, order));
