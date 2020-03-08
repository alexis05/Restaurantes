import {
  REQUEST_ERROR,
  REQUEST_ENVIADO,
  TRAER_DETALLE_PRODUCTO
} from "../types/tiendaTypes";

const initialState = {
  error: "",
  loadingGlobal: false,
  detalleProducto: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ENVIADO:
      return { ...state, loadingGlobal: true };

    case TRAER_DETALLE_PRODUCTO:
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        detalleProducto: action.payload
      };

    case REQUEST_ERROR:
      return { ...state, error: action.payload, loadingGlobal: false };

    default:
      return state;
  }
};
