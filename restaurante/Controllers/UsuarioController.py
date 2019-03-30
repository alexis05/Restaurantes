from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Usuario
from flask_bcrypt import Bcrypt
from Utilidades.Excepciones import InvalidUsage

mongo = PyMongo(app)
bcrypt = Bcrypt(app)

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

class UsuariosGet(Resource):
    def get(self):
        output = []
        for user in Usuario.objects:
            output.append({
                "id": str(user.id),
                'nombre': user.nombre,
                'email': user.email,
                'telefono': user.telefono,
                'direccion': user.direccion,
                'creado': user.creado,
                'foto': user.foto,
                'estado': user.estado
            })
        return jsonify({'resultado': output})

class UsuarioPorId(Resource):
    def get(self, id):
        output = []
        for user in Usuario.objects(id=id):
            output.append({
                "id": str(user.id),
                'nombre': user.nombre,
                'email': user.email,
                'telefono': user.telefono,
                'direccion': user.direccion,
                'creado': user.creado,
                'foto': user.foto,
                'estado': user.estado
            })
        return jsonify({'resultado': output})

class CrearUsuario(Resource):
    def post(self):
        _nombre = request.json['nombre']
        _telefono = request.json['telefono']
        _email = request.json['email']
        _direccion = request.json['direccion']
        _logo = request.json['logo']
        _clave = request.json['clave']
        _foto = request.json['foto']
        if _nombre is None or _nombre is "":
            raise InvalidUsage("Se debe ingresar un nombre.", status_code=400)
        if _telefono is None or _telefono is "":
            raise InvalidUsage("Se debe ingresar un numero de telefono.", status_code=400)
        if _email is None or _email is "":
            raise InvalidUsage("Se debe ingresar un email.", status_code=400)
        if _direccion is None or _direccion is "":
            raise InvalidUsage("Se debe ingresar una direccion.", status_code=400)
        if _clave is None or _clave is "":
            raise InvalidUsage("Se debe ingresar una clave.", status_code=400)

        user = Usuario(nombre=_nombre,
                       email=_email,
                       telefono=_telefono,
                       direccion=_direccion,
                       clave=bcrypt.generate_password_hash(_clave),
                       foto=_foto)
        try:
            user.save()
        except errors.NotUniqueError:
            return jsonify({'error': "Usuario duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})

class ActualizarUsuario(Resource):
    def put(self):
        _id = request.json['id']
        _nombre = request.json['nombre']
        _email = request.json['email']
        _telefono = request.json['telefono']
        _direccion = request.json['direccion']
        _clave = request.json['clave']
        _foto = request.json['foto']
        _id = request.json['id']

        if _nombre is None or _nombre is "":
            raise ValueError("Se debe ingresar un nombre.")
        if _telefono is None or _telefono is "":
            raise ValueError("Se debe ingresar un numero de telefono.")
        if _email is None or _email is "":
            raise ValueError("Se debe ingresar un email.")
        if _direccion is None or _direccion is "":
            raise ValueError("Se debe ingresar una direccion.")
        if _clave is None or _clave is "":
            raise ValueError("Se debe ingresar un detalle del producto.")
        if _id is None or _id is "":
            raise InvalidUsage("Se debe ingresar un detalle del producto.", status_code=400)

        user = Usuario.objects(id=_id)
        try:
            user.update(nombre=_nombre)
            user.update(telefono=_telefono)
            user.update(email=_email)
            user.update(direccion=_direccion)
            user.update(calve=_clave)
            user.update(foto=_foto)
        except errors.NotUniqueError:
            return jsonify({'error': "Usuario duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})