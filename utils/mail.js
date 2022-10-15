let stringToFormatPrice = Intl.NumberFormat('en-US');
exports.mailmodel = (username, phone, address, dateOrder, inforProduct, totalPrice) => {
    const tableList = `<h1>Xin chao ${username} </h1>
        <p> Phone : ${phone}</p>
<p>Address : ${address}</p>
<p>Date Order : ${dateOrder}</p>
<table>
    <thead>
        <tr>
            <th>Tên Sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
    </thead>
    <tbody>
        ${inforProduct.map((item) => (
        `<tr>
                <th>${item.name}</th>
                <th><img src=${item.img} style="width: 50px"/></th>
                <th>${stringToFormatPrice.format(item.price)} VND</th>
                <th>${item.amount}</th>
                <th>
                ${stringToFormatPrice.format(item.price * item.amount)} VND
                </th>
        </tr>`)
    )}
    </tbody >
</table > 
<h3>Tổng Thanh Toán <br>
${stringToFormatPrice.format(totalPrice)} VND 
</h3>

<h3>
Cảm ơn bạn!
</h3>
`
    return tableList;
}