const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = JSON.parse(JSON.stringify(student))

mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)


/*
* student.parent.name không bị ảnh hưởng
*
* Bởi vì const mentor = JSON.parse(JSON.stringify(student)) là deep copy đồng thời là cách làm mạnh
* gồm 2 bước. Bước tạo chuỗi string tạm thời và bước tạo một object mới tại địa chỉ ô nhớ mới nên dữ
* liệu không bị tham chiếu dẫn đến trùng lặp. Nhưng cách làm này
* gây tốn dung lượng ram gấp 2 lần vì phải làm đồng thời 2 công việc khiến chương trình trở nên chậm hơn.
*/