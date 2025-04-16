const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shivam20112004:Shi%4020vam_11@gofood.qu3u4wr.mongodb.net/GoFood?retryWrites=true&w=majority&appName=GoFood';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");

    const db = mongoose.connection.db;

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
const foodCategoryCollection = mongoose.connection.db.collection("FoodCategory");

const data1 = await foodItemsCollection.find({}).toArray();
global.food_items = data1;

const data2 = await foodCategoryCollection.find({}).toArray();
global.foodCategory = data2;

    
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};

module.exports = mongoDB;
