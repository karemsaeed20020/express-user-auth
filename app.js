import express from 'express';
import bcrypt from 'bcrypt';

const app = express();

const users = [];
app.use(express.json());


app.post('./register', async (req, res) => {
    try {
        const {email, password} = req.body;
         // Find User
        const findUser = users.find((data) => email == data.email);
        if (findUser) {
            res.status(400).send("Wrong email or password!");
        }
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({email, password: hashedPassword});
        res.status(201).send("Register successfully!");
    } catch(err) {
        res.status(500).send({message: err.message});
    }
})

app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
         // Find User
        const findUser = users.find((data) => email == data.email);
        if (!findUser) {
            res.status(400).send("Wrong email or password!");
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (passwordMatch) {
            res.status(200).send("Logged in successfully!");
        } else {
            res.status(400).send("Wrong email or password!");
        }

    } catch(err)  {
        res.status(500).send({message: err.message});
    }
})

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});