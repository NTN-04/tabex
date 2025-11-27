# Tabex.js

Một thư viện JavaScript nhẹ và đơn giản để tạo giao diện tab một cách dễ dàng.

## Tính năng

- **Không phụ thuộc:** Được viết bằng JavaScript thuần (vanilla JS).
- **Cấu trúc HTML linh hoạt:** Tương thích với cấu trúc HTML của bạn.
- **Lưu trạng thái:** Tùy chọn ghi nhớ tab đang hoạt động cuối cùng bằng cách sử dụng tham số trên URL.
- **Dễ tùy chỉnh:** Dễ dàng cấu hình tên class và hành vi.
- **API công khai:** Điều khiển các tab theo chương trình với các phương thức như `switch()` và `destroy()`.

### 1. Cài đặt

Nhúng tệp `tabex.js` vào tệp HTML của bạn. 

```html
<body>
  ...
  <script src="path/to/tabex.js"></script>
</body>
```

### 2. Cấu trúc HTML

Tạo một danh sách các liên kết tab và một tập hợp các khối nội dung (panel) tương ứng. Thuộc tính `href` của mỗi liên kết phải trỏ đến `id` của panel liên quan.

```html
<!-- Thanh điều hướng Tab -->
<ul id="my-tabs">
  <li><a href="#panel-1">Tính năng 1</a></li>
  <li><a href="#panel-2">Tính năng 2</a></li>
  <li><a href="#panel-3">Tính năng 3</a></li>
</ul>

<!-- Các khối nội dung -->
<div class="panels">
  <div id="panel-1">
    <p>Nội dung cho panel thứ nhất.</p>
  </div>
  <div id="panel-2">
    <p>Nội dung cho panel thứ hai.</p>
  </div>
  <div id="panel-3">
    <p>Nội dung cho panel thứ ba.</p>
  </div>
</div>
```

### 3. Khởi tạo JavaScript

Tạo một thực thể `Tabex` mới, truyền vào CSS selector (vd: #my-tabs) của vùng chứa thanh điều hướng tab.

```javascript
const myTabs = new Tabex("#my-tabs", {
  activeClassName: "active-tab", // class css của tab đang được active
  remember: true, // ghi nhớ tab khi tải trang
  onChange: (data) => {
    console.log(`Đã chuyển sang tab: ${data.tab.textContent}`);
  }, // Hàm callback trả về {tab, panel}
});
```

## Các phương thức công khai

Sau khi khởi tạo, bạn có thể điều khiển thực thể Tabex bằng các phương thức này.

### switch(input)

Chuyển sang một tab cụ thể theo chương trình.

```javascript
// Chuyển tab bằng selector
myTabs.switch("#panel-2");

// Chuyển tab bằng tham chiếu phần tử
const secondTabLink = document.querySelector('a[href="#panel-2"]');
myTabs.switch(secondTabLink);
```

### destroy()

Xóa tất cả các trình lắng nghe sự kiện và khôi phục lại HTML ban đầu của vùng chứa, vô hiệu hóa chức năng tab một cách hiệu quả.

```javascript
myTabs.destroy();
```


