//Carregando modulos
    const handlebars = require('express-handlebars')
    const express = require('express')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./rotas/admin')
    const path = require('path')
    const mongoose = require('mongoose')

//Configuracoes
    //body parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
    //Handlebars
      app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao Mongo')
        }).catch((err) => {
            console.log('Erro ao se conectar' + err)
        })
    //public
        app.use(express.static(path.join(__dirname,'public')))

//Rotas
        app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor ligado...')
})