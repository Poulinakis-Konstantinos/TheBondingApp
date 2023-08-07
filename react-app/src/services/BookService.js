import { hostNameUrl } from "../config/api";
import axios from "axios";


export const getMyBonds = (userId) => {
  const bonds = axios.get(`${hostNameUrl}/getMyBonds`);
  return bonds;
}

export const getMyTradesByBondId = (bondId, userId) => {
  const trades = axios.get(`${hostNameUrl}/getMyTradesByBondId?bondId=${bondId}`);
  return trades;
}

export const getMyBondsNextFive = (date) => {
  const bondsNextFive = axios.get(`${hostNameUrl}/getMyBondsIn5days?date=${date}`);
  return bondsNextFive;
}

export const getMyBondsLastFive = (date) => {
  const bondsLastFive = axios.get(`${hostNameUrl}/getMyBondsBefore5Days?date=${date}`);
  return bondsLastFive;
}



