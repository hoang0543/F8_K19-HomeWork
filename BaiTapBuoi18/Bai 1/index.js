const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = { ...student }

mentor.name = 'bang'
mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)

/*
* student.name không bị đổi
* student.parent.name có bị đổi
*
* Bởi vì biến mentor được khai với cú pháp shallow copy chỉ thay đổi địa chỉ ô nhớ
* (tạo ra địa chỉ mới cho lớp ngoài)
* lớp bên ngoài student.name nên giá trị nằm ở 2 ô riêng biệt do đó không bị lặp.
*
* Còn lớp mentor.parent.name chưa được chọc tới nên js sẽ trỏ tới một địa điểm
* chung là student.parent.name khiến giá trị bị tham chiếu.
*/