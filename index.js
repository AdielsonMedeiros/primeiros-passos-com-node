const express = require('express');

const server = express();

//localhost:3000/curso
const cursos = ['Node JS', 'Java script', 'React Native']


server.get('/curso/:index', (req,res)=>{
    const {index} = req.params;
    return res.json(cursos[index]);
})

server.listen(3000)