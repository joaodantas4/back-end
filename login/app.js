const express = require('express');
const bodyParser = require ('body-parser');
const mysql = require ('mysql2');


const app = express ();
const port = 3000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'joaoaparecido',
    password:'joao123',
    database: 'login'
})

db.connect ((error)=> {
    if (error){
        console.log('erro ao conectar o mysql');

    }else{
        console.log('conectado ao mysql')
    }
})

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=> {
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req, res)=> {
      const username= req.body.usuario
      const password= req.body.senha
      console.log(username, password)

      db.query ('select password from user where username = ? ', [username], (error, results)=>{
        if (results.length > 0 ){
            const passwordBD = results [0].password
            if (passwordBD === password){
                console.log('Verdadeiro')
            }else{
                console.log('Senha incorreta')
            }
       
        }else{
            console.log('Usuario nao registrado')
        }
      })
      
      
      console.log (username, password)
})

app.listen(port, ()=> {
    console.log (`Servidor rodando no endereço: https://localhost:${port}`)
})
