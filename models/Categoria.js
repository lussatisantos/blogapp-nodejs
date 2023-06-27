const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Categoria = new Schema ({
    nome: {
        type: string,
        required: true
    },
    slug: {
        type: string,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categorias', Categorias)