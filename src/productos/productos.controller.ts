import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}

  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file'))
  async leerExcel(@UploadedFile() file: Express.Multer.File) {
    try {
      await this.productoService.leerExcel(file.path);
      return { message: 'Importación exitosa', status: 200 };
    } catch (error) {
      console.error(error);
      return { message: 'Error en la importación', status: 500 };
    }
  }

  @Get()
  async obtenerProductosAll() {
    return this.productoService.obtenerProductos();
  }
}
