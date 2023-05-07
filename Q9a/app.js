const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.post('/calculate', (req, res) => {
    const number = parseInt(req.body.number);

    const result = {
        increment: number + 1,
        decrement: number - 1,
        square: number * number
    };

    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
