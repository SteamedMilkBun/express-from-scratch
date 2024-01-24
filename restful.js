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

app.get("/foods", (req, res, next) => {
    pool.query(`SELECT * FROM foods`)
    .then((data) => {
        console.log(data.rows);
        res.json(data.rows);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.get("/foods/:index", (req, res, next) => {
    const foods_id = Number.parseInt(req.params.index);

    if (Number.isNaN(foods_id) || foods_id <= 0) {
        console.log(`Dear adventurer, that's a bad request - ${req.params.index} is not a valid index!`);
        res.sendStatus(400);
        return;
    }

    console.log(`Yes dear customer, one moment while I look for what is in food id: ${foods_id}`)
    pool.query(`SELECT * FROM foods WHERE foods_id = $1`,[foods_id])
    .then((data) => {
        if (data.rows.length === 0) {
            console.log(`I'm terribly sorry - nothing was found at food id: ${foods_id}`)
            res.sendStatus(404);
            return;
        }
        console.log(`Good choice! Here's what I found at foods id: ${foods_id}.`);
        console.log(data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.post("/foods", (req, res, next) => {
    const foodName = req.body.foods_name;
    const unitQuantity = Number(req.body.foods_quantity);
    const hpRestored = Number(req.body.foods_hp_restored);
    const foodPrice = Number(req.body.foods_price);

    if (!foodName || !unitQuantity || !hpRestored || !foodPrice) {
        console.log(`I'm sorry, I require the food's name, unit quantity, hp restored, and price.`);
        if (!foodName) {
            console.log(`I don't know the food's name.`)
        }

        if (!unitQuantity) {
            if (Number.isNaN(unitQuantity)) {
                console.log(`I need the unit quantity to be a number.`);
                console.log(`You gave me: unit quantity: ${req.body.foods_quantity}, which is a ${typeof req.body.foods_quantity}.`);
            }
            console.log(`Please give a valid unit quantity.`)
        }

        if (!hpRestored) {
            if (Number.isNaN(hpRestored)) {
                console.log(`I need the hp restored to be a number.`);
                console.log(`You gave me: hp restored: ${req.body.foods_hp_restored}, which is a ${typeof req.body.foods_hp_restored}.`);
            }
            console.log(`Please give a valid hp restored.`)
        }

        if (!foodPrice) {
            if (Number.isNaN(foodPrice)) {
                console.log(`I need the food's price to be a number.`);
                console.log(`You gave me: food price: ${req.body.foods_price}, which is a ${typeof req.body.foods_price}.`);
            }
            console.log(`Please give a valid food's price.`)
        }

        console.log(`I'll be happy to reconsider your offer once you have gathered all of this information.`)
        res.sendStatus(400);
        return;
    }
    
    console.log(`Looks like you are offering me:`);
    console.log(`${foodName}, which comes in quantities of ${unitQuantity}, and restores ${hpRestored} HP, for ${foodPrice} gold.`);
    pool.query(`INSERT INTO foods (foods_name, foods_quantity, foods_hp_restored, foods_price)
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [foodName, unitQuantity, hpRestored, foodPrice])
    .then((data) => {
        console.log(`Here's your receipt for this transaction:`);
        console.log(data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

// app.patch();

// app.delete();

// app.use();

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})