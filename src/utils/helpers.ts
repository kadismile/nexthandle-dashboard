
export const formatTotal = (val:number) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export const toUpperCase = (val:any) => {
  if (val) {
    return val.toUpperCase()
  }
  return ''
};