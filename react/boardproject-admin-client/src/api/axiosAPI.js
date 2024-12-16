import axios from "axios";



export const axiosApi = axios.create({
  baseURL : 'http://localhost:8080', 
  headers : {'Content-type' : 'application/json'},
  // withCredentials : true // 쿠키 포함 설정
  // 서버에서도 credential 허용 설정 필요함
});