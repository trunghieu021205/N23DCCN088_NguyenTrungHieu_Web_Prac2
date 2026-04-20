const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: [true, 'Tên khách hàng là bắt buộc'] 
  },
  customerEmail: { 
    type: String, 
    required: [true, 'Email khách hàng là bắt buộc'],
    match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ'] 
  },
  items: [
    {
      productName: { 
        type: String, 
        required: [true, 'Tên sản phẩm là bắt buộc'] 
      },
      quantity: { 
        type: Number, 
        required: [true, 'Số lượng là bắt buộc'],
        min: [1, 'Số lượng phải lớn hơn hoặc bằng 1']
      },
      unitPrice: { 
        type: Number, 
        required: [true, 'Đơn giá là bắt buộc'],
        min: [0, 'Đơn giá không được âm']
      }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: [true, 'Tổng tiền là bắt buộc'],
    min: [0, 'Tổng tiền không được âm']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);