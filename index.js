const express = require('express');
const modeloUsuario = require('./backend/models/user.model');
const modeloProducto = require('./backend/models/productos.model');
require('dotenv').config();

const app = express();
const logger = require('morgan');
app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/productos', async (req, res) => {
	let productos = await modeloProducto.find();
	if(productos) {
		res.status(200).json(productos);
	} else {
		res.status(404).json(productos)
	}
});

app.get('/productos/:ref', async (req, res) => {
	let producto = await modeloProducto.findOne({referencia: req.params.ref});
	if(producto) {
		res.status(200).json(producto);
	} else {
		res.status(404).json(producto);
	}
});

app.post('/productos', async (req, res) => {
	const nuevoProducto = {
		referencia: req.body.referencia,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		stock: req.body.stock,
		imagen: req.body.imagen,
		habilitado: true
	}
	let Insercion = await modeloProducto.create(nuevoProducto);
	if(Insercion) {
		res.status(200).json({"mensaje": "creado correctamente"});
	} else {
		res.status(404).json({"mensaje": "no se creo"});
	}
});

app.put('/productos/:ref', async (req, res) => {
	const productoEditado = {
		referencia: req.params.ref,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		stock: req.body.stock,
		imagen: req.body.imagen,
		habilitado: true
	}
	let Actualizacion = await modeloProducto.findOneAndUpdate({referencia: req.params.ref}, productoEditado);
	if(Actualizacion) {
		res.status(200).json({"producto": Actualizacion, "mensaje": "actualizado correctamente"});
	} else {
		res.status(404).json({"mensaje": "error al actualizar"});
	}
});

app.delete('/productos/:id', async (req, res) => {
	let eliminacion = await modeloProducto.findOneAndDelete({referencia:req.params.id});
	if(eliminacion) {
		res.status(200).json({"mensaje": "eliminacion exitosa"});
	} else {
		res.status(404).json({"mensaje": "error al eliminar"});
	}
})

app.listen(process.env.PORT);