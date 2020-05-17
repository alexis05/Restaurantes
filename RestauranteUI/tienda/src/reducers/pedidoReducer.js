import {
  HACER_PEDIDO,
  REQUEST_ENVIADO_HACER_PEDIDO,
  REQUEST_ERROR_HACER_PEDIDO,
  OBTENER_PEDIDO,
} from "../types/tiendaTypes";

const initialState = {
  error: "",
  loadingGlobal: false,
  idPedidoRealizado: "",
  pedido: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ENVIADO_HACER_PEDIDO:
      return {
        ...state,
        loadingGlobal: true,
      };

    case OBTENER_PEDIDO:
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        idPedidoRealizado: "",
        pedido: action.payload.idPedido,
      };

    case HACER_PEDIDO:
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        idPedidoRealizado: action.payload.idPedidoRealizado,
      };

    case REQUEST_ERROR_HACER_PEDIDO:
      return { ...state, error: action.payload, loadingGlobal: false };

    default:
      return state;
  }
};