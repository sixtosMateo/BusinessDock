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
