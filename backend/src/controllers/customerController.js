
const mongoose = require("mongoose");

const getAllCustomers = async (req, res) => {
  try {
    const collection =
      mongoose.connection.db.collection("customer_monthly");

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const total = await collection.countDocuments();

    const customers = await collection
      .find({})
      .sort({ user_id: 1, month: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.status(200).json({
      success: true,
      totalRecords: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: customers,
    });
  } catch (error) {
    console.error("Fetch customers error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer records",
    });
  }
};

const getCustomerHistory = async (req, res) => {
  try {
    const collection =
      mongoose.connection.db.collection("customer_monthly");

    const { userId } = req.params;

    const history = await collection
      .find({ user_id: userId })
      .sort({ month: 1 })
      .toArray();

    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer history not found",
      });
    }

    res.status(200).json({
      success: true,
      userId,
      totalMonths: history.length,
      data: history,
    });
  } catch (error) {
    console.error("Customer history error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer history",
    });
  }
};



const getStats = async (req, res) => {
  try {
    const collection =
      mongoose.connection.db.collection("customer_monthly");

    const totalRecords = await collection.countDocuments();

    const totalCustomers = await collection.distinct("user_id");

    const churnedRecords = await collection.countDocuments({
      churned: 1,
    });

    const predictedChurnRecords = await collection.countDocuments({
      churned_next_month: 1,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers: totalCustomers.length,
        totalMonthlyRecords: totalRecords,
        churnedRecords,
        predictedChurnRecords,
      },
    });
  } catch (error) {
    console.error("Stats API error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerHistory,
  getStats,
};