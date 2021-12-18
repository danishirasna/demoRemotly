import dotenv from "dotenv"
dotenv.config();


export default {
    SOCKET_SERVER: process.env.REACT_APP_SOCKET_SERVER || "http://localhost:9999"
}