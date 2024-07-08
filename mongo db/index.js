const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/static', express.static('public'));

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB()

const orderSchema = new mongoose.Schema({
  _id: String,
  user_id: String,
  product: String,
  quantity: Number,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
});

const User = mongoose.model("User", userSchema);

const newOrder = new Order({
  _id: "7",
  user_id: "user_id_2",
  product: "Jacke7",
  quantity: 2,
  price: 100,
});

const newUser = new User({
  _id: "user_id_2",
  name: "Sam2",
});

const runAggregation = async (userId) => {
  try {
    // await newUser.save();
    // await newOrder.save();

    const pipeline = [
      {
        $match: { _id: userId }, // Фильтрация пользователей по ID
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user_id",
          as: "orders",
        },
      },
      {
        $unwind: "$orders", // Разворачиваем массив заказов для последующей фильтрации
      },
      // {
      //   $match: { "orders.quantity": { $gte: 1 } }, // Дополнительная фильтрация по заказам
      // },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          orders: { $push: "$orders" },
        },
      },
    ];

    const result = await User.aggregate(pipeline);
    return result[0]
  } catch (err) {
    console.error("Aggregation error:", err);
  }
};

app.get('/get-users', async (req,res) => {
  res.json(await User.find())
})

app.get('/get-users-orders/:id', async (req,res) => {

       let id = req.params.id
       if(id){
        console.log(id)
        let order = await runAggregation(id)
        console.log(order)
        res.json(order)
       }
       
})







  app.listen(3000, (err) => {
    if(err){
      console.log(err)
    }else{
      console.log(3000)
    }
  })