import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});
