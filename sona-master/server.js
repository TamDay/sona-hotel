const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the frontend directory
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Mock Data
let rooms = [
    { id: 1, name: 'Phòng Deluxe', type: 'Giường đôi', price: '1,500,000đ', status: 'Còn trống', image: 'room-1.jpg' },
    { id: 2, name: 'Phòng Premium', type: 'Giường đơn', price: '1,200,000đ', status: 'Đã đặt', image: 'room-2.jpg' },
    { id: 3, name: 'Phòng Suite', type: 'Giường King', price: '2,500,000đ', status: 'Còn trống', image: 'room-3.jpg' },
    { id: 4, name: 'Phòng Family', type: '2 Giường Đôi', price: '3,200,000đ', status: 'Còn trống', image: 'room-4.jpg' }
];

let labs = [
    { id: 1, name: 'Lab 01', topic: 'HTML Cơ Bản', subitems: ['Bài 1: Cấu trúc', 'Bài 2: Thẻ văn bản'], status: 'Hoàn thành' },
    { id: 2, name: 'Lab 02', topic: 'Table & List', subitems: ['Bài 1: Bảng', 'Bài 2: Danh sách'], status: 'Hoàn thành' },
    { id: 3, name: 'Lab 03', topic: 'Frame & Form', subitems: ['Bài 1: Iframe', 'Bài 2: Form'], status: 'Đang làm' },
    { id: 4, name: 'Lab 04', topic: 'CSS Cơ Bản', subitems: ['Bài 1: Selector', 'Bài 2: Color'], status: 'Chưa bắt đầu' }
];

let bookings = [
    { id: 101, customer: 'Nguyễn Văn A', room: 'Deluxe Room', date: '08/05/2026', total: '1,500,000đ', status: 'Đã thanh toán' },
    { id: 102, customer: 'Trần Thị B', room: 'Premium Room', date: '09/05/2026', total: '1,200,000đ', status: 'Chờ duyệt' }
];

// --- ADMIN ROUTES ---
app.get('/admin', (req, res) => {
    res.render('admin/dashboard', { 
        title: 'Tổng Quan Hệ Thống',
        roomCount: rooms.length,
        labCount: labs.length,
        bookingCount: bookings.length,
        recentBookings: bookings.slice(0, 5)
    });
});

app.get('/admin/rooms', (req, res) => {
    res.render('admin/rooms', { title: 'Quản Lý Phòng', rooms });
});

app.get('/admin/labs', (req, res) => {
    res.render('admin/labs', { title: 'Quản Lý Lab', labs });
});

app.get('/admin/bookings', (req, res) => {
    res.render('admin/bookings', { title: 'Đơn Đặt Phòng', bookings });
});

// Root redirect to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`
    =====================================================
    SERVER SONA HOTEL ĐÃ KHỞI ĐỘNG THÀNH CÔNG!
    -----------------------------------------------------
    Đường dẫn Frontend: ${frontendPath}
    Giao diện Website: http://localhost:${PORT}/index.html
    Giao diện Quản trị: http://localhost:${PORT}/admin
    =====================================================
    `);
});
