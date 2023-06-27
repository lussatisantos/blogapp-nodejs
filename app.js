//Carregando modulos
    const handlebars = require('express-handlebars')
    const express = require('express')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./rotas/admin')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')


//Configuracoes
    //sessao
        app.use(session({
            secret: 'nodej',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
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
        app.get('/', (req, res) => {
            res.send('Rota principal')
        })

        app.get('posts', (req, res) => {
            res.send('Listas de postes')
        })
        app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor ligado...')
})