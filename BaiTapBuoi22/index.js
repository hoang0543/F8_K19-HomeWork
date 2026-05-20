const employees = [
   { id: 1, name: "Alice", age: 23, status: 'working' },
   { id: 3, name: "Bob", age: 25, status: 'working' },
   { id: 6, name: "John", age: 27, status: 'working' },
   { id: 8, name: "David", age: 23, status: 'quit_job' },
   { id: 10, name: "Eve", age: 20, status: 'working' },
];


const products = [
   { id: 1, name: "Phone", price: 1200 },
   { id: 2, name: "Laptop", price: 3000  },
   { id: 3, name: "Tab", price: 2000  },
   { id: 4, name: "PC", price: 800  },
   { id: 5, name: "Monitor", price: 1500  },
]


const orders = [
   { id: 1, employeeId: 1, productId: 4, quantity: 1 },
   { id: 2, employeeId: 3, productId: 2, quantity: 4 },
   { id: 3, employeeId: 1, productId: 5, quantity: 3 },
   { id: 4, employeeId: 6, productId: 1, quantity: 2 },
   { id: 5, employeeId: 3, productId: 5, quantity: 3 },
   { id: 6, employeeId: 8, productId: 1, quantity: 1 },
   { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];


/*Bai 1*/
const workingEmployees = employees.filter(employee => employee.status === 'working');
console.log(workingEmployees);

/*Bai 2*/
const getHighestAgeEmp = (arr) => {

     let highestAge = null

    if (arr.length < 1) return null
    highestAge = arr[0]

    for (const number of arr) {
        if (number.age > highestAge.age) highestAge = number
    }
    return highestAge
}

console.log(getHighestAgeEmp(employees))

/*Bai 3*/
const getCheapestPro = (arr) => {
    let cheapestPro = null

    if (arr.length < 1) return null
    cheapestPro = arr[0]

    for (const number of arr) {
        if (number.price < cheapestPro.price) cheapestPro = number
    }
    return cheapestPro
}

console.log(getCheapestPro(products))

/*Bai 4*/
const getHighestQuantityPro = (orders, products) => {
const quantityMap = {}

for (const order of orders) {
    const productId = order.productId
    if (!quantityMap[productId]) quantityMap[productId] = 0

    quantityMap[productId] += order.quantity
}

let highestQuantityProId = null
let maxQuantity = 0
for (const productId in quantityMap) {
    if (quantityMap[productId] > maxQuantity) {
       maxQuantity = quantityMap[productId]
       highestQuantityProId = productId
    }
}
return products.find(p => p.id === Number(highestQuantityProId))
}


console.log(getHighestQuantityPro(orders, products));

/*Bai 5*/
const getHighestRevenuePro = (orders, products) => {
   const revenueMap = {}

   for (const order of orders) {
      const product = products.find(products => products.id === order.productId)

      if (!revenueMap[order.productId]) revenueMap[order.productId] = 0
      revenueMap[order.productId] += order.quantity * product.price
   }

   let highestRevenueProId = null
   let maxRevenue = 0

   for (const productId in revenueMap) {
      if (revenueMap[productId] > maxRevenue) {
         maxRevenue = revenueMap[productId]
         highestRevenueProId = productId
      }
   }
   return products.find(p => p.id === Number(highestRevenueProId))
}

console.log(getHighestRevenuePro(orders, products))

/*Bai 6*/
const getEmployeeByHighestQuantity = (orders, employees) => {
const quantityMap = {}

for (const order of orders) {
    const employeeId = order.employeeId
    if (!quantityMap[employeeId]) quantityMap[employeeId] = 0

    quantityMap[employeeId] += order.quantity
}

let EmployeeByHighestQuantityId = null
let maxQuantity = 0
for (const employeeId in quantityMap) {
    if (quantityMap[employeeId] > maxQuantity) {
       maxQuantity = quantityMap[employeeId]
       EmployeeByHighestQuantityId = employeeId
    }
}
return employees.find(e => e.id === Number(EmployeeByHighestQuantityId))
}


console.log(getEmployeeByHighestQuantity(orders, employees));

/*Bai 7*/
const getEmployeeByHighestRevenue = (orders, employees, products) => {
const revenueMap = {}

for (const order of orders) {
    const employeeId = order.employeeId
    const product = products.find(p => p.id === order.productId)
    if (!revenueMap[employeeId]) revenueMap[employeeId] = 0

    revenueMap[order.employeeId] += order.quantity * product.price
}

let EmployeeByHighestRevenueId = null
let maxRevenue = 0
for (const employeeId in revenueMap) {
    if (revenueMap[employeeId] > maxRevenue) {
       maxRevenue = revenueMap[employeeId]
       EmployeeByHighestRevenueId = employeeId
    }
}
return employees.find(e => e.id === Number(EmployeeByHighestRevenueId))
}

console.log(getEmployeeByHighestRevenue(orders, employees, products));

/*Bai 8*/
const getBestProductPerEmployee = (orders, employees, products) => {
    const result = []

    for (const employee of employees) {
        const employeeOrders = orders.filter(order => order.employeeId === employee.id)

        let bestProduct = null
        let maxRevenue = 0

        for (const order of employeeOrders) {
            const product = products.find(p => p.id === order.productId)
            const revenue = order.quantity * product.price

            if (revenue > maxRevenue) {
                maxRevenue = revenue
                bestProduct = product
            }
        }

        result.push({
            employee: employee.name,
            bestProduct: bestProduct.name,
            revenue: maxRevenue
        })
    }

    return result
}

console.log(getBestProductPerEmployee(orders, employees, products))

/*Bai 9*/
const getCommissionPerEmployee = (orders, employees, products) => {
    const result = []

    for (const employee of employees) {
        const employeeOrders = orders.filter(order => order.employeeId === employee.id)

        let totalRevenue = 0
        for (const order of employeeOrders) {
            const product = products.find(p => p.id === order.productId)
            totalRevenue += order.quantity * product.price
        }

        const commission = totalRevenue * 0.03

        result.push({
            employee: employee.name,
            revenue: totalRevenue,
            commission: commission
        })
    }

    return result
}

console.log(getCommissionPerEmployee(orders, employees, products))

/*Bai 10*/ /*Bài 10 có tái sử dụng code ở bài 9*/
const sortEmployeeByRevenue = (orders, employees, products) => {
    const commissionList = getCommissionPerEmployee(orders, employees, products)

    for (let i = 0; i < commissionList.length - 1; i++) {
        for (let j = i + 1; j < commissionList.length; j++) {
            if (commissionList[j].revenue > commissionList[i].revenue) {
                const temp = commissionList[i]
                commissionList[i] = commissionList[j]
                commissionList[j] = temp
            }
        }
    }

    return commissionList.map(item => item.employee)
}

console.log(sortEmployeeByRevenue(orders, employees, products))