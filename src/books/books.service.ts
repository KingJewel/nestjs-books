import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.entities';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class BooksService {
  
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {} 

  async findAll(paginationQueryDto: PaginationQueryDto) {

    const { limit = 10, current_page = 1 } = paginationQueryDto;

    return await this.bookRepository.find({
      skip: (current_page - 1) * limit,
      take: limit,
      order: {
        "id": "ASC"
      }
    });

  }

  async findOne(id: number) {

    return await this.bookRepository.findOne(
      {
        where: { id }
      });

  }

  async create(bookObject: CreateBookDto) {
    
    return await this.bookRepository.insert(bookObject);

  }

  async update(id: number, bookObject: UpdateBookDto) {

    return this.bookRepository.update(id, bookObject);

  }

  async delete(id: number) {

    return await this.bookRepository.delete(id);

  }

}
