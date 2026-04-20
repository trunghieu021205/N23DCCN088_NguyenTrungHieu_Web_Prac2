# 🚀 LAB 2 - NHÓM 2

## Backend với Node.js & Express | Quản lý Đơn hàng (Orders) API

---

## 📌 Giới thiệu

Dự án xây dựng RESTful API quản lý đơn hàng sử dụng **Node.js, Express và MongoDB Atlas**.
Hệ thống hỗ trợ đầy đủ CRUD và các chức năng nâng cao như **validation, filter, search, sort và logging**.

---
## 🌐 Live Demo

🔗 API đã deploy tại:
https://order-management-dnb6.onrender.com/

📌 Ví dụ:
https://order-management-dnb6.onrender.com/api/orders
---

## 👨‍🎓 Thông tin sinh viên

* **Họ và tên:** Nguyễn Trung Hiếu
* **Mã sinh viên:** N23DCCN088

---

## 🎯 Mục tiêu bài học

* Hiểu cách tổ chức project Express theo mô hình MVC đơn giản
* Kết nối MongoDB Atlas với Mongoose
* Thành thạo các phương thức HTTP: **GET, POST, PUT, DELETE**
* Kiểm thử API bằng Postman / Thunder Client
* Áp dụng các kỹ thuật nâng cao trong backend

---

## 🛠️ Công nghệ sử dụng

* Node.js (>= 18)
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* cors
* morgan (logging)

---

## 📂 Cấu trúc thư mục

```bash id="t0gk1n"
order-management-api/
├── models/
│   └── Order.js
├── routes/
│   └── orderRoutes.js
├── middleware/
│   └── responseHandler.js
├── postman/
│   └── Order Management.postman_collection.json
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Cài đặt & chạy project

### 1. Clone project

```bash id="2b1zwj"
git clone <your-repo-url>
cd order-management-api
```

### 2. Cài dependencies

```bash id="d9s1vw"
npm install
```

### 3. Cấu hình `.env`

```env id="4gkjrk"
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Chạy server

```bash id="l0pq6m"
npm run dev
```

---

## 🔌 API Endpoints

### 🔹 1. Tạo đơn hàng

```bash id="hxv4cj"
POST /api/orders
```

---

### 🔹 2. Lấy danh sách đơn hàng (filter + sort)

```bash id="0rzr77"
GET /api/orders
```

#### Query hỗ trợ:

| Query  | Mô tả                               |
| ------ | ----------------------------------- |
| status | Lọc theo trạng thái                 |
| sort   | Sắp xếp theo totalAmount (asc/desc) |

#### Ví dụ:

```bash id="y8o6n9"
GET /api/orders?status=pending&sort=desc
```

---

### 🔹 3. Tìm kiếm theo tên khách hàng

```bash id="j7l8hf"
GET /api/orders/search?name=...
```

#### Ví dụ:

```bash id="3k0c1x"
GET /api/orders/search?name=an
```

---

### 🔹 4. Lấy đơn hàng theo ID

```bash id="8wfd2z"
GET /api/orders/:id
```

---

### 🔹 5. Cập nhật đơn hàng

```bash id="1m2o9r"
PUT /api/orders/:id
```

---

### 🔹 6. Xóa đơn hàng

```bash id="h5k3xg"
DELETE /api/orders/:id
```

---

## 📥 Ví dụ Request

### ✅ POST - Tạo đơn hàng

```json id="zz7twg"
{
  "customerName": "Nguyen Van A",
  "customerEmail": "vana@email.com",
  "items": [
    {
      "productName": "Laptop Dell XPS",
      "quantity": 1,
      "unitPrice": 25000000
    },
    {
      "productName": "Chuot Logitech",
      "quantity": 2,
      "unitPrice": 500000
    }
  ],
  "totalAmount": 26000000
}
```

---

### 🔄 PUT - Cập nhật trạng thái

```json id="gq61f8"
{
  "status": "confirmed"
}
```

---

## 📦 Postman Collection

Dự án đã bao gồm Postman Collection để test toàn bộ API.

### 📁 File:

```bash id="p8u9md"
postman/Order Management.postman_collection.json
```

### 📥 Cách sử dụng:

1. Mở Postman
2. Chọn **Import**
3. Import file `.json` trong thư mục `postman/`

---

## ✅ Tính năng đã hoàn thành

### ✔️ CRUD đầy đủ

* Create, Read, Update, Delete đơn hàng

### ✔️ Validation nâng cao

* Kiểm tra `items` không rỗng
* Kiểm tra `totalAmount` = tổng (quantity × unitPrice)

### ✔️ Response chuẩn hóa

```json id="66w5g6"
{
  "success": true,
  "data": {},
  "message": "..."
}
```

### ✔️ Filter theo trạng thái

```bash id="6y1q0v"
GET /api/orders?status=pending
```

### ✔️ Search theo tên khách hàng (Regex)

```bash id="mx0v1u"
GET /api/orders/search?name=an
```

### ✔️ Sort theo tổng tiền

```bash id="t0lfjq"
GET /api/orders?sort=asc
GET /api/orders?sort=desc
```

### ✔️ Logging

* Sử dụng morgan để log request

---

## 🧪 Kiểm thử

* Postman
* Thunder Client (VS Code)

---

## 🚀 Deploy

* Database: MongoDB Atlas
* Backend:

  * Render.com
  * Railway.app

⚠️ Lưu ý:

* Cấu hình biến môi trường `PORT`, `MONGO_URI` khi deploy

---

## 💡 Bài học rút ra

* Thiết kế API rõ ràng, dễ mở rộng
* Validate dữ liệu đầu vào là bắt buộc
* Tách route giúp code dễ maintain
* Test kỹ từng endpoint trước khi deploy

---

## 🔥 Quote

> “Đơn hàng ngoài đời có thể sai — nhưng API của bạn thì không được phép sai.”



