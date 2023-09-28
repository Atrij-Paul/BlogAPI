import express from 'express'
import mongoose from 'mongoose'
import router from "./routes/user-routes";

const app = express();
app.use(express.json());
app.use("/api/user" , router);
app.use("/api/blog" , blogRouter)

mongoose.connect('mongodb://127.0.0.1:27017/Blog', { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => app.listen(5000))
.then(() => console.log("Connected to databse and Listening to port 5000")
)
.catch((err) => console.log(err));
