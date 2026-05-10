const products = [
  { id: 1, name: 'iPhone', price: 2000 },
  { id: 2, name: 'Samsung', price: 1500 },
  { id: 3, name: 'Xiaomi', price: 1000 },
  { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  },
  {
    id: 2,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
  },
  {
    id: 3,
    items: [
      { productId: 2, quantity: 2 },
      { productId: 4, quantity: 1 }
    ]
  }
]
function findTopRevenueProduct(products, orders) {

  const revenueByProduct = {}

  for (let rIdx = 0; rIdx < products.length; rIdx = rIdx + 1) {
    const productId = products[rIdx].id;
    revenueByProduct[productId] = 0;
  }

  for (let oIdx = 0; oIdx < orders.length; oIdx = oIdx + 1) {
    const order = orders[oIdx];

    for (let iIdx = 0; iIdx < order.items.length; iIdx = iIdx + 1) {
      const item = order.items[iIdx]

      const productId = item.productId;
      const quantity = item.quantity;

      let productPrice = 0;
      for (let prIdx = 0; prIdx < products.length; prIdx = prIdx + 1) {
        if (products[prIdx].id === productId) productPrice = products[prIdx].price;
      }

      let revenue = productPrice * quantity
      revenueByProduct[productId] = revenueByProduct[productId] + revenue;
    }
  }

  let topProductId = 0;
  let highestRevenue = 0;

  for (let pIdx = 0; pIdx < products.length; pIdx = pIdx + 1) {
    const productId = products[pIdx].id;

    if (revenueByProduct[productId] > highestRevenue) {
      highestRevenue = revenueByProduct[productId];
      topProductId = productId;
    }
  }

  let topProduct = null;
  for (let topPrIdx = 0; topPrIdx < products.length; topPrIdx = topPrIdx + 1) {
    if (products[topPrIdx].id === topProductId) topProduct = products[topPrIdx];
  }

  console.log("Top product by revenue:");
  console.log("Name: " + topProduct.name);
  console.log("Price: " + topProduct.price);
  console.log("Revenue: " + highestRevenue);
}

findTopRevenueProduct(products, orders);