export interface  pedidoCliente  {
  condciones: { pago: boolean; enviado: boolean; anulado: boolean; tramitado: boolean; };
checked: any;
    nombreCliente     :string;
    apellidoCliente   :string;
    emailCliente      :string;
    direccionCliente  :string;
    numeroCliente     :string;
    idPedido          :number;
    idCliente         :number;
    idClientePedido   :number;
    idProducto        :number;
    promocionPedido   :number,
    fechaPedido       :Date;
    fechaEnvio        :Date;
    cantidadPedido    :number;
    cantidadTotal     :number;
    precioTotal       :number;
    estadoPedido      :string;
    nombreProducto    :string;
    pathProducto      :string;
    precioPedido      :number;
    pagoPedido        :boolean;
    tramitePedido     :boolean;
    cumplidoPedido    :boolean;
    anulaPedido       :boolean;
}