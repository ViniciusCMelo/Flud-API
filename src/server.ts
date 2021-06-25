import {request, response} from "express";
import './database/connection';
const express = require('express');

const app = express();

app.get('/users', (request, response) => {
    return response.json({ message: 'Hello World'});
});


//localhost:3333
app.listen(3333);
