export interface  Pedido  {
    idClientePedido      :number;
    idPedido             :number;
    idProducto           :number;
    fechaPedido          :Date;
    cantidadPedido       :number;
    precioPedido         :number;
    promocionPedido      :number;
    pagoPedido           :boolean;
    tramitePedido        :boolean;
    cumplidoPedido       :boolean;
    anulaPedido          :boolean;
    estadoPedido         :string;
   
}
