const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {games,DB,users} = require('./db')
const cors = require('cors')
const jwt = require("jsonwebtoken")


const JWTSecret = "asjidhsjfnasjd124154@jhusjchf"

/*CONFIGURAÇÃO DO BODY PARSER*/
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Configuração do cors
app.use(cors())

/*Sicronizando com o DB*/
DB.sync()

//Midlleware
function auth(req,res,next){
    const authToken = req.headers['authorization']
    if(authToken!=undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(401)
                res.json({err:"Token Invalido"})
            }else{
                req.token = token
                req.loggedUser = {id: data.id, email:data.email}
                next()
            }
        })
    }else{
        res.status(401)
        res.json({err:"Token Invalido"})
    }
}

/*ROTAS */
//Pegar todos os games cadastrados 
app.get('/games',auth,(req,res)=>{
    games.findAll().then(artigos=>{
        res.json(artigos)
    })
    res.status(200)
})

//Pegar apenas um game pela ID
app.get('/games/:id',(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        id = parseInt(id)
        games.findAll({where:{
            id:id
        }}).then(game=>{
            if(game == undefined){
                res.sendStatus(404)
            }else{
                res.json(game)
                res.status(200)
            }
        })

    }
})

//Cadastrar um novo game
app.post('/games',(req,res)=>{
    const {title,price,year}= req.body
    if(title == null || price==null || year == null){
        res.sendStatus(400)
    }else{
        if(isNaN(price) || isNaN(year)){
            res.sendStatus(400)
        }else{
            games.create({
                title,
                price,
                year
            })
        }
        res.sendStatus(200)
    }
})

//Deletar um game
app.delete('/games/:id',(req,res)=>{
    const id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        games.findAll({where:{
            id:id
        }}).then(game=>{
            if(game== undefined){
                res.sendStatus(404)
            }else{
                games.destroy({
                    where:{
                        id:id
                    }
                })
                res.sendStatus(200)
            }
        })
    }
})

//Editar um game
app.put('/games/:id',(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        id = parseInt(id)
        games.findAll({where:{
            id:id
        }}).then(game=>{
            if(game== undefined){
                console.log("entrou")
                res.sendStatus(404)
            }else{
                const {title,price,year}= req.body
                if(title!=undefined){
                    games.update({title:title},{
                        where:{
                            id:id
                        }
                    })
                }if(price != undefined){
                    games.update({price:price},{
                        where:{
                            id:id
                        }
                    })
                }if(year != undefined){
                    games.update({year:year},{
                        where:{
                            id:id
                        }
                    })
                }
                res.sendStatus(200)
            }
        })
    }
})
app.post('/auth',(req,res)=>{
    const {email,senha} = req.body
    if (email!=undefined){
        users.findAll({where:{
            email:email
        }}).then(user=>{
            if(user==undefined){
                res.sendStatus(404)
            }else{
                if(user[0].password == senha){
                    jwt.sign({email:user[0].email,id:user[0].id},JWTSecret,{expiresIn:'12h'},(err,token)=>{
                        if(err){
                            res.sendStatus(400)
                        }else{
                            res.status(200)
                            res.json({token:token})
                        }
                    })

                }else{
                    res.sendStatus(401)
                }
                
            }
        }).catch(err=>console.log(err))
    }else{
        res.sendStatus(400)
    }
})

/*COLOCANDO O SERVIDOR NO AR */
app.listen(3000,() => console.log("API ativa"))