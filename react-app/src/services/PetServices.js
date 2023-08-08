import { hostNameUrl } from "../config/api";
import axios from "axios";

export const findPets = () => {
  const pets = [{id:1,name:"Obi",age:23}];
  //const pets = axios.get(`${hostNameUrl}/dogs`);
  return pets;
}

