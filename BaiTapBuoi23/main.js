const invoiceData = {
    seller: {
    name: "WinMark 2 Hai Bà Trưng",
    address: "2 Bà Trưng - Hoàn Kiếm - HN",
    phone: "012345678",
  },
  buyer: {
    name: "Nguyễn Văn A",
    age: 20,
    location: "Hà Đông, Hà Nội",
  },
  invoice: {
    code: "WM-2026-052101",
    date: "2026/05/21",
  },
  items: [
    { name: "Ao Thun", size: "XL", qty: 1, price: 300000 },
    { name: "Ao Thun", size: "XL", qty: 1, price: 200000 },
  ],
  discount: 0.5,
};

function formatMoney(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

function createElement(tag, attrs = {}, text = "") {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (text) el.innerText = text;
  return el;
}

const receipt = createElement("div");
receipt.setAttribute("id", "receipt");
receipt.setAttribute("style", `
max-width: 550px;
margin: 20px auto;
border: 1px solid #e0e0e0;
border-radius: 12px;
`);

/*Header*/
const header = createElement("div");
header.setAttribute("style", `
padding: 20px 24px;
border-bottom: 1px solid #eee;
display: flex;
justify-content: space-between; 
align-items: flex-start;
`);
/*Bên trái header*/
const logoContainer = createElement("div");

const logoWrap = createElement("div");
logoWrap.setAttribute("style", `display: flex; align-items:center`);
const logo = createElement("div");
logo.setAttribute("style", `display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; background:#1a7a5e; border-radius:6px; color:#fff; font-size:11px; font-weight:bold; margin-right:8px; vertical-align:middle;`)
logo.innerText = "WM"

const shopName = createElement("div")
shopName.setAttribute("style", `font-size:17px; font-weight:600; vertical-align:middle;`)
shopName.innerText = invoiceData.seller.name;

const tagline = createElement("p")
tagline.setAttribute("style", `margin:4px 0 0; font-size:12px; color:#666;`)
tagline.innerText = "Cung cấp sản phẩm thời trang cao cấp & thiết kế độc quyền."

header.append(logoContainer)
logoContainer.append(logoWrap, tagline)
logoWrap.append(logo, shopName)

/*Bên phải header*/
const invoiceInfo = createElement("div");
invoiceInfo.setAttribute("style", "text-align:right");

const badge = createElement("div")
badge.innerText = "HOÁ ĐƠN BÁN LẺ"
badge.setAttribute("style", "font-size:13px; font-weight:600; color:#1a7a5e; text-transform:uppercase; margin-bottom:4px;")

const codeEl = createElement("div")
codeEl.innerText = "Mã số: " + invoiceData.invoice.code;
codeEl.setAttribute("style", "font-size: 10px")

const dateEl = createElement("div")
dateEl.innerText = "Ngày bán: " + invoiceData.invoice.date;
dateEl.setAttribute("style", "font-size: 10px")

header.append(invoiceInfo)
invoiceInfo.append(badge, codeEl, dateEl)

/*Seller, Buyer*/
const parties = createElement("div");
parties.setAttribute("style", `
padding: 20px 24px;
border-bottom: 1px solid #eee;
display: flex;
gap: 90px; 
align-items: flex-start;
`);

/*Seller*/
const sellerInfo = createElement("div");
sellerInfo.setAttribute("style", `font-size:11px`)

const sellerTitle = createElement("div");
sellerTitle.innerText = "ĐƠN VỊ BÁN HÀNG (SELLER)"
sellerTitle.setAttribute("style", `padding-bottom: 10px`)

const sellerName = createElement("div");
sellerName.innerText = invoiceData.seller.name;
sellerName.setAttribute("style", `font-size:13px; font-weight:600`)

const sellerAddr = createElement("div");
sellerAddr.innerText = "📍 " + invoiceData.seller.address;

const sellerTel = createElement("div");
sellerTel.innerText = "📞 " + invoiceData.seller.phone;

parties.append(sellerInfo)
sellerInfo.append(sellerTitle, sellerName, sellerAddr, sellerTel)

/*Buyer*/
const buyerInfo = createElement("div");
buyerInfo.setAttribute("style", `font-size:11px`)

const buyerTitle = createElement("div");
buyerTitle.innerText = "KHÁCH HÀNG (BUYER)"
buyerTitle.setAttribute("style", `padding-bottom: 10px`)

const buyerName = createElement("div");
buyerName.innerText = invoiceData.buyer.name;
buyerName.setAttribute("style", `font-size:13px; font-weight:600`)

const buyerAddr = createElement("div");
buyerAddr.innerText = "📍 " + invoiceData.buyer.location;

parties.append(buyerInfo)
buyerInfo.append(buyerTitle, buyerName, buyerAddr)

/*Sản phẩm bán được*/
const tableWrap = createElement("div");
tableWrap.setAttribute("style", "padding: 0 24px;");

const table = createElement("table");
table.setAttribute("style", "width:100%;border-collapse:collapse; font-size:13px");

const tableHeadEL = createElement("thead");

const tableHeadRow = createElement("tr");
tableHeadRow.setAttribute("style", `border-bottom:1px solid #eee`);

const columns = ["STT", "Tên sản phẩm", "Size", "SL", "Đơn giá", "Thành tiền"];
columns.forEach((col) => {
  const th = createElement ("th")
  th.setAttribute ("style", "padding:10px 0 8px; text-align:left; font-size:11px; color:#999")
  th.innerText = col
  tableHeadRow.append(th)
})

tableHeadEL.append(tableHeadRow)
table.append(tableHeadEL)

const tbody = createElement("tbody");

invoiceData.items.forEach((item, index) => {
  const total = item.qty * item.price;

  const row = createElement("tr", { style: "border-bottom:1px solid #eee;" });

  const cells = [
    index + 1,
    item.name,
    item.size,
    item.qty,
    formatMoney(item.price),
    formatMoney(total),
  ];

  cells.forEach((value, i) => {
    const td = createElement("td", { style: "padding:12px 0; color:" + (i === 5 ? "#111" : "#444") + "; font-weight:" + (i === 5 ? "600" : "400") + ";" }, String(value));
    row.append(td);
  });

  tbody.append(row);
});

table.append(tbody);
tableWrap.append(table);

/*Footer*/
const footer = createElement("div", {
  style:
    "padding:16px 24px; display:flex; gap:16px; align-items:flex-start; border-top:1px solid #eee;",
});

const promoBox = createElement("div", {
  style:
    "flex:1; background:#e8f5f0; border-radius:8px; padding:12px 14px;",
});
const promoTitle = createElement(
  "p",
  { style: "margin:0 0 4px; font-size:11px; font-weight:600; color:#0f6e56; text-transform:uppercase;" },
  "Khuyến mãi / Trợ giá"
);
const promoDesc = createElement(
  "p",
  { style: "margin:0; font-size:12px; color:#0f6e56;" },
  "Khuyến mãi 50% dành cho Khách hàng thân thiết"
);
promoBox.append(promoTitle, promoDesc);

let subtotal = 0
invoiceData.items.forEach((item) => {
  subtotal = subtotal + item.qty * item.price
})
const discountAmt = subtotal * invoiceData.discount;
const total = subtotal - discountAmt;

const summaryBox = createElement("div", { style: "min-width:180px;" });

const rowSubtotal = createElement("div", { style: "display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;" });
rowSubtotal.append(
  createElement("span", { style: "color:#666;" }, "Cộng tiền hàng:"),
  createElement("span", {}, formatMoney(subtotal))
);

const rowDiscount = createElement("div", { style: "display:flex; justify-content:space-between; margin-bottom:12px; font-size:13px;" });
rowDiscount.append(
  createElement("span", { style: "color:#666;" }, "Khấu trừ giảm giá:"),
  createElement("span", { style: "color:#c0392b;" }, "-" + formatMoney(discountAmt))
);

const rowTotal = createElement("div", {
  style:
    "display:flex; justify-content:space-between; border-top:1px solid #eee; padding-top:10px;",
});
rowTotal.append(
  createElement("span", { style: "font-size:14px; font-weight:600;" }, "Tổng thanh toán:"),
  createElement("span", { style: "font-size:16px; font-weight:700; color:#1a7a5e;" }, formatMoney(total))
);

summaryBox.append(rowSubtotal, rowDiscount, rowTotal);
footer.append(promoBox, summaryBox);

/*Ráp tất cả lại*/
receipt.append(header, parties, tableWrap, footer);
document.body.append(receipt)