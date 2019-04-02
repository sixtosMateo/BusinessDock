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
