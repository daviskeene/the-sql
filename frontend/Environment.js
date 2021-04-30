const PRODUCTION = "https://mentorsearch.herokuapp.com";
const LOCAL = "http://localhost:8000";

export const URL_ROOT = process.env.NODE_ENV === "development" ? LOCAL : PRODUCTION