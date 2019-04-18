import axios from 'axios';

export function postOutgoingItem(data, cartItem) {
  console.log("posting Outgoing item")
  const object={
    transactionId: data.transactionId,
    barcode: cartItem.barcode,
    name: cartItem.name,
    transactionType:"outgoing",
    quantity: cartItem.quantity,
    price: cartItem.itemSaleTotal,
    tax: Math.round(1000 *(cartItem.itemSaleTotal * cartItem.tax))/1000,
    itemSaleTotal: Math.round(1000 * (cartItem.itemSaleTotal + (cartItem.itemSaleTotal * cartItem.tax)))/1000
  }

  return axios.post(`http://127.0.0.1:8000/api/outgoingtransactionItem/${data.transactionId}/`, object)
}
