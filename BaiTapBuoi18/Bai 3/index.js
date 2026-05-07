const students = [
  { name: 'a' },
  { name: 'b' }
]

const newStudents = [...students]

newStudents[0].name = 'z'

console.log(students)
console.log(newStudents)


/*
* Mảng bên trong không bị thay đổi
* Phần tử bên trong students[0].name có bị thay đổi thành "z"
*
* Bởi vì khi dùng shallow copy một array mới được tạo tại địa chỉ ô nhớ mới độc lập với ô nhớ cũ.
* Nhưng dù mảng được tạo mới tại một địa chỉ mới thế nhưng các giá trị được copy sang mảng mới
* không phải là giá trị của object mà chỉ là địa chỉ tham chiếu trỏ đến object đó.
*
* Vậy nên mảng thì mới nhưng các phần tử bên trong vẫn đang trỏ chung vào object trong bộ nhớ khiến khi
* thay đổi ở newStudents[0].name mà phần tử bên trong students[0].name cũng bị thay đổi
* */