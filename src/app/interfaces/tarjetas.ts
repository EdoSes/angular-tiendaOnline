export class tarjetas {
    id?            :string;
    titular        :string;
    numeroTarjeta  :string;
    fechaExpira    :string;
    cvv            :number;
    fechaCreacion  :Date;
    fechaActualiza :Date; 
id_card: any;
name: any;
number: any;
type: any;

    constructor(titular:string, numeroTarjeta:string, fechaExpiracion:string, cvv:number){
        this.titular        =titular;
        this.numeroTarjeta  =numeroTarjeta;
        this.fechaExpira    =fechaExpiracion;
        this.cvv            =cvv;
        this.fechaCreacion  =new Date();
        this.fechaActualiza =new Date();

    }
}