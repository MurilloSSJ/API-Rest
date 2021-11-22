const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {games,DB,users} = require('./db')
const cors = require('cors')
/*CONFIGURAÇÃO DO BODY PARSER*/
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Configuração do cors
app.use(cors())

/*Sicronizando com o DB*/
DB.sync()

/*ROTAS */
//Pegar todos os games cadastrados 
app.get('/games',(req,res)=>{
    games.findAll().then(artigos=>{
        res.json(artigos)
    })
    res.statusCode = 200
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

/*COLOCANDO O SERVIDOR NO AR */
app.listen(3000,() => console.log("API ativa"))