export const getTimeStamps = () => {
  return new Date().getTime().toString()
}


export const getDate = () => {
  return new Date().toLocaleDateString();
}
