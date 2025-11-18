
import { AppDataSource } from "./config/typeorm.config.js";
import config from "./config/config.js";
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
export {AppDataSource, config, ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData};
