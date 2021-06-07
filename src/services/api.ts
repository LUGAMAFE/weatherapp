import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.openweathermap.org/"
});
export const key = "e86fefc4aa520c74b95bdff4b82ca68b";
