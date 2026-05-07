const user = {
  name: 'hoang',
  address: {
    city: 'HN',
    location: {
      lat: 123
    }
  }
}

const newUser = { ...user }

newUser.address.location.lat = 999

console.log(user.address.location.lat)

/*
* Kết qủa sẽ là 999
*
* Bởi vì const newUser = { ...user } sử dụng shallow copy nên chỉ tạo địa chỉ ô nhớ
* mới (độc lập) ở lớp ngoài cùng đến user.name. Hơn nữa name là giá trị nguyên thuỷ
* được sao chép giá trị độc lập nên khi dù thay đổi giá trị ở newUser.name cũng không ảnh hưởng.
*
* Từ lớp thứ 2 user.address thì chỉ có địa chỉ vùng nhớ được sao chép sang newUser.
* Vậy nên khi thay đổi giá trị ở newUser.address các giá trị tại user.address cũng
* bị tham chiếu do trỏ chung đến một vùng nhớ tại user.address.
* */