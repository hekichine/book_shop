import orderItemSchema from "../model/orderItemSchema";
import orderSchema from "../model/orderSchema";
import productSchema from "../model/productSchema";

const orderController = {
  getlist: async (req, res) => {
    let filter = {};
    if (req.query?.user) {
      filter = { user: req.query?.user };
    }
    if (req.query?.status) {
      filter = { status: req.query?.status };
    }
    const orderList = await orderSchema
      .find(filter)
      .populate("user", "fullname")
      .populate({
        path: "orderItems",
        populate: "product",
      })
      .sort("createdAt");

    if (!orderList) {
      res.status(200).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      orderList: orderList,
    });
  },
  create: async (req, res) => {
    try {
      const orderItemIds = Promise.all(
        req.body?.orderItems.map(async (orderitem) => {
          let newOrderItem = new orderItemSchema({
            quantity: orderitem?.quantity,
            product: orderitem?.product,
          });
          newOrderItem = await newOrderItem.save();
          if (newOrderItem) {
            await productSchema.findByIdAndUpdate(
              orderitem?.product,
              {
                $inc: { countInStock: -orderitem?.quantity },
                sell: Number(orderitem?.quantity),
              },
              { new: true }
            );
          }
          return newOrderItem._id;
        })
      );
      const orderItemIdsResolved = await orderItemIds;

      let order = new orderSchema({
        orderItems: orderItemIdsResolved,
        shippingAddress: req.body?.shippingAddress,
        phone: req.body?.phone,
        totalPrice: req.body?.totalPrice,
        user: req.body?.user,
        payment: req.body?.payment,
      });

      order = await order.save();
      if (!order) {
        return res.status(500).json({ message: "Error", success: false });
      }
      res.status(200).json({
        message: "Success",
        success: true,
        order,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: "Error",
        error,
      });
    }
  },
  findById: async (req, res) => {
    const order = await orderSchema
      .findById(req.params?.id)
      .populate("user", "fullname")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });

    if (!order) {
      return res.status(200).json({ message: "Not found", success: false });
    }
    res.status(200).json({
      order,
    });
  },
  update: async (req, res) => {
    let { id } = req.params;
    let order = req.body;
    await orderSchema
      .findByIdAndUpdate(order?.id || id, order, { new: true })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Update success",
            order: result,
            success: true,
          });
        } else {
          res.status(404).json({
            message: "Id not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          err,
        });
      });
  },
  delete: async (req, res) => {
    let { id } = req.params;
    await orderSchema
      .findByIdAndDelete(id)
      .then(async (result) => {
        if (result) {
          await result.orderItems.map(async (orderItem) => {
            await orderItemSchema.findByIdAndDelete(orderItem);
          });
          res.status(200).json({
            message: "Delete success",
            success: true,
          });
        } else {
          res.status(404).json({
            message: "ID not found",
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error query",
          success: false,
          err,
        });
      });
  },
  statis: async (req, res) => {
    try {
      let pip = [
        {
          $match: {
            status: "Done",
          },
        },
        {
          $group: {
            _id: { $month: "$updatedAt" },
            total: { $sum: "$totalPrice" },
          },
        },
      ];

      let result = await orderSchema.aggregate(pip);

      if (!result) {
        return res.status(200).json({
          success: false,
          message: "Statis failed",
        });
      }
      res.status(200).json({
        success: true,
        statis: result,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        error,
      });
    }
  },
  statisByMonth: async (req, res) => {
    try {
      let month = req.query?.month;
      let year = req.query?.year;
      let result = await orderSchema
        .find({
          $expr: {
            $and: [
              { $eq: [{ $year: "$updatedAt" }, year] },
              { $eq: [{ $month: "$updatedAt" }, month] },
            ],
          },
        })
        .populate("user", "fullname");
      if (!result) {
        return res.status(200).json({
          success: false,
          message: "Statis failed",
        });
      }
      res.status(200).json({
        success: true,
        statis: result,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        error,
      });
    }
  },
  // getstatis: async (req, res) => {
  //
  // },
};

export default orderController;

/* data order

  "orderItems":[
    { 
      quantity:3,
      "product": "6408608a78f1d758b6d224c9"
    },
    {
      "quantity":5,
      "product":"6408621962dd4cd9b76dd187"
    }
  ],
  "shippingAddress":"thai nguyen",
  "phone":"0125874",
  "totalPrice":9999,
  "user":"640a88471447ad112a82838c"


*/
