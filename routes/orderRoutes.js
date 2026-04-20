const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { successResponse, errorResponse } = require('../middleware/responseHandler');

// 1. Lấy tất cả đơn hàng (GET /api/orders)
router.get('/', async (req, res) => {
    const { status, sort } = req.query;
    const filter = {};
    // nếu có query status thì thêm vào filter
    if (req.query.status) {
        filter.status = req.query.status;
    }
    let sortOption = { createdAt: -1 }; 
    if (sort === 'asc') {
        sortOption = { totalAmount: 1 };
    } else if (sort === 'desc') {
        sortOption = { totalAmount: -1 };
    }
    try {
        const orders = await Order.find(filter).sort(sortOption);
        return successResponse(res, orders, "Lấy danh sách đơn hàng thành công");
        } catch (err) {
        return errorResponse(res, "Lỗi khi lấy danh sách đơn hàng", 500, err);
    }
});

// 2. Tìm kiếm theo tên khách hàng (GET /api/orders/search?name=...)
router.get('/search', async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return errorResponse(res, "Vui lòng nhập tên cần tìm", 400);
        }

        const orders = await Order.find({
            customerName: { $regex: name, $options: 'i' }
            }).sort({ createdAt: -1 });

        return successResponse(res, orders, "Tìm kiếm đơn hàng thành công");
        } catch (err) {
        return errorResponse(res, "Lỗi khi tìm kiếm đơn hàng", 500, err);
    }
});

// 3. Lấy đơn hàng theo ID (GET /api/orders/:id)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return errorResponse(res, "Không tìm thấy đơn hàng", 404);
    }

    return successResponse(res, order, "Lấy thông tin đơn hàng thành công");
  } catch (err) {
    return errorResponse(res, "Lỗi khi lấy đơn hàng theo ID", 500, err);
  }
});

// 4. Tạo đơn hàng mới (POST /api/orders)
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse(res, "Danh sách items không được rỗng", 400);
    }

    const calculatedTotal = items.reduce((sum, item) => {
      return sum + (Number(item.quantity) * Number(item.unitPrice));
    }, 0);

    if (calculatedTotal !== Number(totalAmount)) {
      return errorResponse(
        res,
        `totalAmount không chính xác. Giá trị tính được: ${calculatedTotal}`,
        400
      );
    }

    const order = new Order({
      customerName,
      customerEmail,
      items,
      totalAmount
    });

    const newOrder = await order.save();

    return successResponse(res, newOrder, "Tạo đơn hàng mới thành công", 201);

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return errorResponse(res, errors, 400);
    }

    return errorResponse(res, "Lỗi khi tạo đơn hàng", 500, err);
  }
});

// 5. Cập nhật đơn hàng (PUT /api/orders/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return errorResponse(res, "Không tìm thấy đơn hàng để cập nhật", 404);
    }

    return successResponse(res, updatedOrder, "Cập nhật đơn hàng thành công");
  } catch (err) {
    return errorResponse(res, "Lỗi khi cập nhật đơn hàng", 400, err);
  }
});

// 6. Xóa đơn hàng (DELETE /api/orders/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return errorResponse(res, "Không tìm thấy đơn hàng để xóa", 404);
    }

    return successResponse(res, null, "Xóa đơn hàng thành công");
  } catch (err) {
    return errorResponse(res, "Lỗi khi xóa đơn hàng", 500, err);
  }
});

module.exports = router;