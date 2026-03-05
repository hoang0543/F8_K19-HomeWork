Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?
Inline style.

Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?
#main thắng. vì id có độ ưu tiên cao nhất và chi tiết nhất.

Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?
Kết quả là màu chữ sẽ hiển thị màu hồng vì khi này inline style có độ ưu tiên cao nhất.

Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?
Vì CSS đọc từ trên xuống dưới. Điều kiện để override là theme.css phải được link sau base.css.

Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.
Có nhiều trường hợp:
-Khi class ở trong file css khác nhau các phần tử sẽ ăn theo file css được link sau
-Khi ở một phần sử sử dụng id hoặc inline
-Khi css chi tiết hơn( vd: p.title)

Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích
selector nào thắng cuối cùng.
Phần tử có CSS phức tạp nhất:<h2 class="title" id="special" style="color: green">Danh sach don hang</h2>
Các selector:
      tag(h2)
      class(.title)
      id(#special)
      inline style
Selector thắng: inline style vì có độ ưu tiên cao nhất