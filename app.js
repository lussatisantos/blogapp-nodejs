//Carregando modulos
    const handlebars = require('express-handlebars')
    const express = require('express')
    onst bodyParser = require('body-parser')
    const app = express()

//Configuracoes
    //body parser
        app.arguments(bodyParser.urlencoded({extended:true}))
        app.arguments(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose

//Rotas

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor ligado...')
})