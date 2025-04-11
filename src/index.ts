import express from "express";
import cors from "cors";

import Routes from "./presentation/routes/index.js";

const app = express();


app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use("/api", Routes());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
