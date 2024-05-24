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
        console.log('Erro ao conectar o mysql');

    }else{
        console.log('Conectado ao mysql')
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

      db.query ('SELECT password FROM user WHERE username = ? ', [username], (error, results)=>{
        if (results.length > 0 ){
            const passwordBD = results [0].password
            if (passwordBD === password){
                console.log('Entrou')
            }else{
                console.log('Senha incorreta')
            }
       
        }else{
            console.log('Usuário não registrado')
        }
      })
      
      
     
})

app.post("/cadastro", (req, res)=> {
    const username= req.body.username
    const password= req.body.password
    const confirm= req.body.passwordConfirm


if (password === confirm){
    db.query('insert into user (username, password) values (?, ?)', [username, password],  (error, results)=> {
        if (error){
            console.log("ERRO AO REALIZAR O CADASTRO", error)
        } else{
            console.log("CADASTRO REALIZADO COM SUCESSO")
        }
    })
} else{
    console.log('senhas nao coincidem')
}
})

app.get("/cadastro", (req, res)=> {
    res.sendFile(__dirname + '/cadastro.html')
})
app.listen(port, ()=> {
    console.log (`Servidor rodando no endereço: https://localhost:${port}`)
})
