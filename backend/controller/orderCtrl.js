import CartModel from "../model/Cart.js";
import OrderModel from "../model/orderedModel.js";
import User from "../model/userModel.js";
import asyncHandler from  'express-async-handler'

export const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { userId } = req.body.user;

    try {
      if (!COD) throw new Error("Create cash order failed");
      const user = await User.findById(userId);
      let userCart = await CartModel.findOne({ orderby: user._id });
      let finalAmout = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmout = userCart.totalAfterDiscount;
      } else {
        finalAmout = userCart.cartTotal;
      }
  
      let newOrder = await new OrderModel({
        products: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmout,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "usd",
        },
        orderby: user._id,
        orderStatus: "Cash on Delivery",
      }).save();
      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
      res.json({ message: "success" });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  export const getOrders = asyncHandler(async (req, res) => {
    const { userId } = req.body.user;
  
    try {
      const userorders = await OrderModel.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  export const getAllOrders = asyncHandler(async (req, res) => {
    try {
      const alluserorders = await OrderModel.find()
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(alluserorders);
    } catch (error) {
      throw new Error(error);
    }
  });
 export  const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id} = req.params;
   
    try {
      const userorders = await OrderModel.findOne({ orderby: id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
      const updateOrderStatus = await OrderModel.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
      res.json(updateOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  });
  