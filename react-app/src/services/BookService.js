import { hostNameUrl } from "../config/api";
import axios from "axios";


export const getMyBonds = () => {
  const bonds = axios.get(`${hostNameUrl}/getMyBonds`);
  return bonds;
}

export const getMyTradesByBondId = (bondId) => {
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


export const getRedeemBond = (bondId) => {
  const bondsLastFive = axios.get(`${hostNameUrl}/getRedeemedBonds?date=${bondId}`);
  return bondsLastFive;
}

export const redeemBondAxios = (bondId) => {
  const redeemedBond = axios.get(`${hostNameUrl}/users/RedeemBond?bondId=${bondId}`);
  return redeemedBond;
}

export const getBondByBondIdAndUserId = (bondId) => {
  const Bond = axios.get(`${hostNameUrl}/getMyBondById?bondId=${bondId}`)
  return Bond;
}

export const getMyClients = () => {
  const data = axios.get(`${hostNameUrl}/users/getMyClients`)
  return data;
}


