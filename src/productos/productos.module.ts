import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
