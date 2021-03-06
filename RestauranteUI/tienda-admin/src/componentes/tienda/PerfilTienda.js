import React from "react";
import API from "../../API";
import Cookies from "universal-cookie";

class PerfilTienda extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    value: undefined,
    tienda_act: false,
  };

  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
        //id: this.state.data.data.id,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.actualizarTienda(this.state.value);
  };

  actualizarTienda = async (tienda) => {
    this.setState({ loading: true, error: null });

    try {
      const cookies = new Cookies();
      const id = cookies.get("rt");
      console.log(id);
      if (!id) return;
      await API.put(`restauranteapi/restaurante/${id}`, tienda).then((res) => {
        this.setState({
          loading: false,
          tienda_act: true,
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  componentDidMount() {
    this.fechDataRestaurante();
  }

  fechDataRestaurante = async () => {
    try {
      const cookies = new Cookies();
      const id = cookies.get("rt");
      await API.get(`restauranteapi/restaurante/${id}`).then((res) => {
        this.setState({
          loading: false,
          data: res.data,
          value: res.data.data,
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true) {
      return "loading...";
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">{this.state.data.data.nombre}</h1>
                <p className="lead">Puede editar los siguientes valores</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-6">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        className="form-control"
                        type="hidden"
                        onChange={this.handleChange}
                        name="id"
                        value={this.state.data.data.id}
                      />
                      <div className="form-group">
                        <label>Nombre</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="nombre"
                          placeholder="Ingresa un nombre"
                          onChange={this.handleChange}
                          defaultValue={this.state.data.data.nombre}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          placeholder="Ingresa un correo"
                          onChange={this.handleChange}
                          defaultValue={this.state.data.data.email}
                        />
                      </div>
                      <div className="form-group">
                        <label>Eslogan</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="eslogan"
                          placeholder="Ingresa un eslogan"
                          onChange={this.handleChange}
                          defaultValue={this.state.data.data.eslogan || ""}
                        />
                      </div>
                      <div className="form-group">
                        <label>Clave</label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          name="clave"
                          placeholder="Ingrese una clave"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Horario</label>
                        <textarea
                          className="form-control form-control-lg"
                          name="horario"
                          placeholder="Ingresa un horario"
                          onChange={this.handleChange}
                          defaultValue={this.state.data.data.horario || ""}
                        />
                      </div>
                      <div className="form-group">
                        <label>Telefono</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="telefono"
                          placeholder="Ingresa un numero de telefono"
                          onChange={this.handleChange}
                          defaultValue={this.state.data.data.telefono || ""}
                        />
                      </div>
                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary"
                        >
                          Actualizar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PerfilTienda;
