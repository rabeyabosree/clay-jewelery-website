const express = require('express');
const router = express.Router();
const Order = require("../models/orderModel");
const User = require('../models/userModel');
const upload = require('./../utilize/storage.js');
const Product = require("../models/productsModel.js");
const Activity = require('../models/activityModel.js');
const verifyToken = require('../middleware/verifyToken.js');
const verifyAdmin = require('../middleware/isAdmin.js');
const Notification = require("../models/notificationModel.js")

// products upload by admin
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { 
      title, description, price, category,
      isPopular, isOnSale, isBOGO,featured, stock,message
    } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = req.file.path;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      isPopular: isPopular || false,
      isOnSale: isOnSale || false,
      isBOGO: isBOGO || false,
      featured: featured || false,
      stock: stock || 0,
      imageUrl
    });

    const savedProduct = await newProduct.save();

 
      // Notify all users
      const users = await User.find();
      const notifications = users.map((user) => ({
        userId: user._id,
        message: message || `A new product, ${newProduct.title}, has been uploaded!`,
        productId: newProduct._id
      }));
      await Notification.insertMany(notifications);
    

    return res.status(201).json({
      message: "Product created and notifications sent!",
      product: savedProduct
    });

  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all products
router.get('/', async (req, res) => {
  try {
    const { filter, title, category } = req.query;
    let query = {};  // This will hold the final query object

    // Define filter options
    const filterOptions = {
      sales: { isOnSale: true },
      bogo: { isBOGO: true },
      new: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    };

    // Apply filter if exists
    if (filter && filterOptions[filter]) {
      query = { ...query, ...filterOptions[filter] }; // Merge the filter query with main query
    }

    // Apply title search filter if provided
    if (title) {
      query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive regex search for title
    }

    // Apply category search filter if provided
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive regex search for category
    }

    console.log("🔍 Fetching products with query:", query); // Debug the query structure

    const products = await Product.find(query); // Fetch products using the query

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products); // Return the fetched products
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users (Admin-only)
router.get('/users',  async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).send({ users, message: 'All users fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Get user details (Admin-only)
router.get('/users/:userId', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ user, message: 'User details fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Get all activities for a admin 
router.get('/activity', verifyToken,  async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email role'); // optional, very useful for UI

    res.status(200).send({
      activity :activities,
      message: 'All user activities fetched successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// get all orders for a admin
router.get("/orders", async(req ,res)=>{
  try {
    const orders = await Order.find()
    .populate("userId", "name email") // populate user details
    .populate("products.productId", "title price") //populate product details
    .sort({createdAt: -1}) // sort by createdAt in descending order
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({message : "server error"})
    
  }
})

// Promote or demote user (Admin-only)
router.put('/users/:userId/role', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.userId, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ user, message: 'User role updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});


module.exports = router;