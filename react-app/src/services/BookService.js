import { hostNameUrl } from "../config/api";
import axios from "axios";


export const getBondsByUserId = () => {
  const bonds = axios.get(`${hostNameUrl}/getMyBonds`);
  return bonds;
}

export const getTradesByUserAndBondId = (bondId, userId) => {
  const trades = axios.get(`${hostNameUrl}/getTradesByBondIdAndUserId?bondId=${bondId}&userId=${userId}`);
  return trades;
}

export const getBondsNextFive = (date, userId) => {
  const bondsNextFive = axios.get(`${hostNameUrl}/getBondsIn5Days?date=${date}&userId=${userId}`);
  return bondsNextFive;
}

export const getBondsLastFive = (date, userId) => {
  const bondsLastFive = axios.get(`${hostNameUrl}/getBondsBefore5Days?date=${date}&userId=${userId}`);
  return bondsLastFive;
}



