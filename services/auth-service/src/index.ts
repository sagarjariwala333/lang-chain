import express from 'express';

const app = express();
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Auth service listening on ${PORT}`));
