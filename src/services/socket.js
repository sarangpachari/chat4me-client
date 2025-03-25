import { io } from "socket.io-client";
import SERVER_BASE_URL from "./serverURL";

const SOCKET_URL = `${SERVER_BASE_URL}`;

const socket = io(SOCKET_URL, { autoConnect: false });

export default socket;
