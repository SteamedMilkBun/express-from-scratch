import express, { query } from "express";
import pg from "pg";

const app = express();
    app.use(express.json());
const PORT = 8000;

const pool = new pg.Pool({
    host: "localhost",
    port: 6432,
    user: "postgres",
    password: "postgres",
    database: "express_from_scratch"
});

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})