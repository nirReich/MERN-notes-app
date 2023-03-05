import app from "./app";
import mongoose from "mongoose";

import env from "./utils/validateEnv";

const port = env.PORT;

if (port)
  mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log("mongoose connected!");
      app.listen(port, () => {
        console.log(`server running on port ${port}`);
      });
    })
    .catch(console.error);
