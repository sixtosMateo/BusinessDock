export function addLocalStorage(type, object){
  var a = []

  a = JSON.parse(localStorage.getItem(type));
  a.push(object);
  localStorage.setItem(type, JSON.stringify(a));

}

export function deleteLocalStorage(type,object){
  var a = []
  a = JSON.parse(localStorage.getItem(type));
  a = a.filter((vendor)=>{ return vendor.vendorId !== object})
  localStorage.setItem(type, JSON.stringify(a));
}

export function editVendorLocalStorage(type,id,object){
  var a = []
  a = JSON.parse(localStorage.getItem(type));
  a = a.map((vendor)=>
              { if(vendor.vendorId === id){
                  return vendor = object}
                return vendor
              })
  
  localStorage.setItem(type, JSON.stringify(a));
}

export function deleteItemLocalStorage(type,object){
  var a = []
  a = JSON.parse(localStorage.getItem(type));
  a = a.filter((vendor)=>{ return vendor.itemId !== object})
  localStorage.setItem(type, JSON.stringify(a));
}
