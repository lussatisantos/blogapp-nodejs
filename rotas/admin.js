const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('Categoria')

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
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('/admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        res.redirect('/admin')
    })
})

router.post('/categorias/nova', (req, res) => {

    var erros = []

    if (!req.body.nome && typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push ({texto: 'Nome invalido'})
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({tetxto: 'Slug invalido'})
    }

    if (req.bidy.nome.length < 2) {
        erros.push({texto: 'Nome da categoria muito curta'})
    }

    if (erros.length > 0) {
        res.render('admin/addCaategorias', {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um errro ao salvar a categoria, tente novamente!')
            res.redirect('/admin')
        })
    } 
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_idf:req.params.id}).then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg', 'Esta categoria nao existe')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria')
            res.redirect('/admin/categorias')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao editar a categoria')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/apagar', (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash('sucess_msg', 'Categoria apagada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', 'Nao foi possivel apagar a categoria')
        res.redirect('/admin/categorias')
    })
})

module.exports = router