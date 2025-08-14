export interface  Ventas  {
    id                   :number;
    idClientePedido      :number;
    idPedido             :number;
    idProducto           :number;
    fechaPedido          :Date;
    cantidadPedido       :number;
    precioPedido         :number;
    estadoPedido         :string;
    pagoPedido           :boolean;
    tramitePedido        :boolean;
    cumplidoPedido       :boolean;
    anulaPedido          :boolean;
    nombreCliente       :string;
    apellidoCliente     :string;
    numeroCliente       :number;
    nombreProducto      :string;
    pathProducto        :string;    
    idCliente           :number;
    Items_Pedido        :number;
    Precio_Total        :number;
    Cantidad_Pedidos    :number;


    // pedido.model.ts

   
}