const http = require('http')
const url = require('url')
const fs = require('fs')
const daysAndMonthsChecker = require('./dayandmonthchecker')

http
	.createServer(function (req, res) {
		const params = url.parse(req.url, true).query
		const name = params.archivo
		const content = params.contenido
		const newName = params.nuevo_nombre

		if (req.url.includes('/crear')) {
			fs.writeFile(name, `${daysAndMonthsChecker()}\n${content}`, () => {
				res.write('Archivo creado con éxito!')
				res.end()
			})
		}
		if (req.url.includes('/leer')) {
			fs.readFile(name, (err, data) => {
				if (err) {
					res.write('El archivo no existe')
					res.end()
				}
				res.write(data)
				res.end()
			})
		}
		if (req.url.includes('/renombrar')) {
			fs.rename(`${name}`, newName, (error) => {
				if (error) {
					res.write(`el archivo ${name} no existe`)
					res.end()
				} else {
					res.write(`Archivo ${name} renombrado por ${newName}`)
					res.end()
				}
			})
		}
		if (req.url.includes('/eliminar')) {
			function espera(name) {
				res.write(`Archivo ${name} eliminado con éxito`)
				res.end()
			}
			fs.unlink(name, (err) => {
				if (err) {
					res.write(`el archivo ${name} no existe`)
					res.end()
				} else {
					res.write(`Archivo ${name} eliminado con éxito`)
					res.end()
				}
			})
		}
	})
	.listen(8080, () => console.log('Escuchando el puerto 8080'))
// if (req.url.includes('/eliminar')) {
//    fs.unlink(name, (err, data) => {
//       res.write(`Archivo ${name} eliminado con éxito`)
//       res.end()
//    })
// }

// fs.unlink(name, (err) => {
//    if (err) {
//       res.write(`el archivo ${name} no existe`)
//       res.end()
//    } else {
//       res.write(`Archivo ${name} eliminado con éxito`)
//       res.end()
//    }
// })
