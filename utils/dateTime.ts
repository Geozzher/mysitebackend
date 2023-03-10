import moment from "moment";
export const getTimeStamps = () => {
  return new Date().getTime().toString();
}

export const getDate = () => {
  return moment().format('YYYY/MM/DD')
}

export const getDateTime = () => {
  return moment().format('YYYY/MM/DD HH:mm:ss')
}
