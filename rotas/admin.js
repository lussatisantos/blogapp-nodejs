const express = require ('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Pagina principal do painel administrativo')
})

router.get('/posts', (req, res) => {
    res.send('Pagina de postagens')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.get('/categorias', (req, res) => {
    res.render('admin/addcategorias')
})

module.exports = router