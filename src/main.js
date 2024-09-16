import connectDb from "./db/main.js";
import { createApp } from "./app.js";

connectDb()

const app = createApp()

app.listen(3000, ()=>{
    console.log("Server Activated!")
})