const PRODUCTION = "https://cs411-deploy.herokuapp.com";
const LOCAL = "http://localhost:8000";

export const URL_ROOT = process.env.NODE_ENV === "development" ? LOCAL : PRODUCTION
export const WEB_ROOT = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://the-sql.vercel.app"