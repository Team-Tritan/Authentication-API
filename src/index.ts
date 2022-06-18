import DatabaseConnection from "./libs/db/Init";
import Server from "./libs/express/Server";

class AuthServer {
  constructor() {
    new DatabaseConnection();
    new Server();
  }
}

export default new AuthServer();
