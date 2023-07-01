const express = require('express');

const server = express();
server.use(express.json())

//localhost:3000/curso
const cursos = ['Node JS', 'Java script', 'React Native']

//MIDDLEWARE GLOBAL
server.use((req,res, next)=>{
    console.log(`Url chamada: ${req.url}`)
    return next();
});



function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "nome do curso obrigatorio"})
    }
    return next();
}



function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index]
    if(!curso){
        return res.status(400).json({ error: "o curso nao existe"})
    }
    req.curso = curso;

    return next();
}



server.get('/cursos', (req,res)=>{
    return res.json(cursos);
})




server.get('/cursos/:index',checkIndexCurso, (req,res)=>{
    return res.json(req.curso);
});




//criando um novo curso (POST)
server.post ('/cursos',checkCurso , (req,res)=>{
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos)
})



//atualizando um curso (PUT)

server.put('/cursos/:index',checkCurso, checkIndexCurso,(req,res)=>{
    const {index} = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos);
})



//excluindo cursos existentes

server.delete('/cursos/:index',checkIndexCurso, (req,res)=>{
    const {index} = req.params;
    cursos.splice(index, 1)
    return res.json({message: "curso deletado com sucesso"})
})

server.listen(3000)