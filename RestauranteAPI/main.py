import json
import locale
from libs.Pedido import Pedido
from flask import jsonify
from bson import ObjectId
from flask import Flask, request
from flask_restful import Resource, Api
from flask_pymongo import PyMongo
from Controllers.ProductoController import ProductosEnGeneral, RestYCantidadDeProductos, ProductoPorId, ProductosGet, CrearProducto, ActualizarProducto, MarcarDisponibilidadDelProducto, BorrarProducto
from Controllers.RestauranteController import RestauranteGet, RestaurantePorId, CrearRestaurante, ActualizarRestaurante
from Controllers.UsuarioController import UsuariosGet, UsuarioPorId, CrearUsuario, ActualizarUsuario
from Controllers.EncargadoController import EncargadosGet, EncargadoPorId, CrearEncargado, ActualizarEncargado
from Utilidades.Config import app
from flask_cors import CORS

#app = Flask(__name__)
api = Api(app)
CORS(app)

#app.config['MONGO_DBNAME'] = 'rest_ab'
#app.config["MONGO_URI"] = "mongodb://localhost:32784/rest_ab"
mongo = PyMongo(app)

todos = {}


class Personas(Resource):
    def get(self):
        persona1 = Pedido()
        persona1.agregar("arroz blanco")
        persona1.agregar("Frijoles")
        persona1.asignar("alexis")
        return {'hello': 'world'}


api.add_resource(Personas, '/')

api.add_resource(ProductosEnGeneral, '/Productos/<int:limit>/<int:skip>')
api.add_resource(ProductosGet, '/Productos/<string:id>')
api.add_resource(ProductoPorId, '/Producto/<string:id>')
api.add_resource(CrearProducto, '/Producto/Nuevo')
api.add_resource(ActualizarProducto, '/Producto/Actualizar')
api.add_resource(MarcarDisponibilidadDelProducto, '/Producto/Disponibilidad')
api.add_resource(RestYCantidadDeProductos,
                 '/Restaurante/Producto/Cantidad')
api.add_resource(BorrarProducto, '/Producto/Borrar')

api.add_resource(RestauranteGet, '/Restaurantes')
api.add_resource(RestaurantePorId, '/Restaurante/<string:id>')
api.add_resource(CrearRestaurante, '/Restaurante/Nuevo')
api.add_resource(ActualizarRestaurante, '/Restaurante/Actualizar')

api.add_resource(UsuariosGet, '/Usuarios')
api.add_resource(UsuarioPorId, '/Usuario/<string:id>')
api.add_resource(CrearUsuario, '/Usuario/Nuevo')
api.add_resource(ActualizarUsuario, '/Usuario/Actualizar')

api.add_resource(EncargadosGet, '/Encargados/<string:id>')
api.add_resource(EncargadoPorId, '/Encargado/<string:id>')
api.add_resource(CrearEncargado, '/Encargado/Nuevo')
api.add_resource(ActualizarEncargado, '/Encargado/Actualizar')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
