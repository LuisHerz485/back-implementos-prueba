import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Productos' })
export class Productos {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ unique: true })
  COD: string;

  @Column()
  NOMBRE: string;

  @Column()
  UNITID: string;

  @Column()
  PRECIO_VENTA: number;

  @Column()
  COSTO_FINANIERO: number;

  @Column()
  ID_LINEA: string;

  @Column()
  ID_CATEGORIA: string;

  @Column()
  COD_ID_PROVEEDOR: string;

  @Column()
  ESTADO: string;

  @Column()
  TIPO_FABRICA: string;

  @Column()
  NUMERO_PARTE: string;

  @Column()
  LINEA: string;

  @Column()
  CATEGORIA: string;

  @Column()
  UEN: string;

  @Column()
  MARCA: string;

  @Column()
  PRECIO_MINIMO: number;

  @Column()
  DESCRIPCION: string;

  @Column()
  IMAGEN_150: string;

  @Column()
  IMAGEN_450: string;
}
