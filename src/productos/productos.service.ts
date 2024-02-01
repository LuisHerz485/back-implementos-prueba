import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './productos.entity';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private productosRepository: Repository<Productos>,
  ) {}

  public obtenerProductos() {
    return this.productosRepository.find();
  }

  public createProducto(productos: any[]): Promise<void[]> {
    const promises = productos.map(async (producto) => {
      const newProducto = this.productosRepository.create(producto);
      await this.productosRepository.save(newProducto);
    });

    return Promise.all(promises);
  }

  public async leerExcel(filePath: string): Promise<string> {
    console.log('file', filePath);
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile(filePath);

    const result: { sheetName: string; data: Record<string, any>[] }[] = [];

    workBook.eachSheet((sheet) => {
      const sheetData: Record<string, any>[] = [];
      const headerRow = sheet.getRow(4);

      sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber < 5) {
          return;
        }

        const rowData: Record<string, any> = {};

        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
          let columnHeader = headerRow.getCell(colNumber).value as string;

          if (columnHeader === 'CODIGO') columnHeader = 'COD';
          if (columnHeader === 'PRECIO VENTA') columnHeader = 'PRECIO_VENTA';
          if (columnHeader === 'IDLINEA') columnHeader = 'ID_LINEA';
          if (columnHeader === 'COSTO_FINANCIERO')
            columnHeader = 'COSTO_FINANIERO';
          if (columnHeader === 'IDCATEGORIA') columnHeader = 'ID_CATEGORIA';
          if (columnHeader === 'CodIDProveedor')
            columnHeader = 'COD_ID_PROVEEDOR';
          if (columnHeader === 'TIPOFABRICANTE') columnHeader = 'TIPO_FABRICA';
          if (columnHeader === 'PRECIO MINIMO') columnHeader = 'PRECIO_MINIMO';
          if (columnHeader === 'IMAGEN 150') columnHeader = 'IMAGEN_150';
          if (columnHeader === 'IMAGEN 450') columnHeader = 'IMAGEN_450';

          rowData[columnHeader] = cell.value;
        });

        sheetData.push(rowData);
      });

      result.push({
        sheetName: sheet.name,
        data: sheetData,
      });
    });

    await this.createProducto(result[0].data);

    return 'terminado';
  }
}
