import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Book } from './books.entities'

@Module({
  imports: [ TypeOrmModule.forFeature([ Book ]) ],
  controllers: [ BooksController ],
  providers: [ BooksService ]
})
export class BooksModule {}
