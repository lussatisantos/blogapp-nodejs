//Carregando modulos
    const handlebars = require('express-handlebars')
    const express = require('express')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./rotas/admin')
    //const mongoose = require('mongoose)

//Configuracoes
    //body parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
    //Handlebars
      /*  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars') */
    //Mongoose

//Rotas
        app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor ligado...')
})