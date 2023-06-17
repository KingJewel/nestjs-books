import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ BooksModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'FSABL1808SM',
    database: 'nestjs-books',
    autoLoadEntities: true,
    synchronize: true
  }) ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
