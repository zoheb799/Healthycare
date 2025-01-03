import dotenv from "dotenv";
import { connectDatabase } from "./db.js";
import { app } from "./app.js";
dotenv.config({ path: ".env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
