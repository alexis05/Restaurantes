import React, { Component } from "react";
import { connect } from "react-redux";
import {Views} from "../../constantes/index";
import Producto from "./Producto";
import CarritoBar from "../carrito/CarritoBar";
import DetallesCarritoView from "../carrito/DetallesCarritoView";

class ListaProducto extends Component {

  render(){
    return(
        <div>
       
          {
            this.props.viewActive === Views.PRODUCTLIST ?
            <div>
              <div className="col-12 px-0 pt-2">
                  <div className="row justify-content-around justify-content-lg-start  pb-5">
                    {this.props.productos.map((producto, index) => (
                      
                      <div
                        className="card-deck mb-2 pb-2 pt-3 px-0 mx-0 col-auto"
                        key={index}
                      >
                        <Producto
                          nombre={producto.nombre}
                          precio={producto.precio}
                          detalle={producto.detalle}
                          creado={producto.registrado}
                          restaurante={producto.restaurante}
                          _id={producto._id}
                        />
                      </div>
                    ))}
                  </div>
              </div>
            
              <CarritoBar /> 
            </div>
          : ""}
          
          { this.props.viewActive === Views.DETAILSCART ?
            <DetallesCarritoView className=""/>
            : "" }
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  productos: state.productoReducer.productoReducer.productos,
  viewActive:state.carritoReducer.carritoReducer.viewActive
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListaProducto);
