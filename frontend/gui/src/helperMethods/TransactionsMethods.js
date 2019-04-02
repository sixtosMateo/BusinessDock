// finds the item with the given barcode in the given list
export function getItem(barcode, list){
  const item = list.find(item => item.barcode === barcode)
  if(item){
    return item
  }
  return null

}

// determined if item with given barcode exist on shopping cart
export function isDuplicateCart(barcode, list){
  let duplicate
  duplicate = list.find(item=> item.barcode === barcode)
  return duplicate

}

export function addTotal(list){
    let subTotal = 0;
    list.map(item => (subTotal += item.itemSaleTotal));
    const tempTax = subTotal * .0975;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    return{
      subTotal:subTotal,
      tax: tax,
      total:total
    }
}

// increment count of duplicate item
export function increment(list, barcode){
  let tempCart =[...list]
  let sum = 0
  
  const duplicateItem = tempCart.find(item=>item.barcode === barcode)
  const index = tempCart.indexOf(duplicateItem)
  const item = tempCart[index]

  item.quantity = item.quantity + 1;

  if(item.salePrice){
    sum = item.quantity * item.salePrice;
  }else{
    sum = item.quantity * item.purchasedPrice;
  }

  item.itemSaleTotal = sum;

  return tempCart

}
