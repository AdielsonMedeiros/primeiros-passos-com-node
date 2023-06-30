const express = require('express');

const server = express();
server.use(express.json())

//localhost:3000/curso
const cursos = ['Node JS', 'Java script', 'React Native']

server.get('/cursos', (req,res)=>{
    return res.json(cursos);
})


server.get('/cursos/:index', (req,res)=>{
    const {index} = req.params;
    return res.json(cursos[index]);
});


//criando um novo curso (POST)
server.post ('/cursos', (req,res)=>{
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos)
})

//atualizando um curso (PUT)

server.put('/cursos/:index', (req,res)=>{
    const {index} = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos);
})

//excluindo cursos existentes

server.delete('/cursos/:index', (req,res)=>{
    const {index} = req.params;
    cursos.splice(index, 1)
    return res.json({message: "curso deletado com sucesso"})
})

server.listen(3000)