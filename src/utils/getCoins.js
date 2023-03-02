import api from "../services/api";

export const getCoins = async () => {
  try {
    const response = await api.get("/last/USD-BRL,EUR-BRL,BTC-BRL");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCoinUsd = async (selectCoin) => {
  try {
    const response = await api.get(`/json/daily/${selectCoin}/7`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
