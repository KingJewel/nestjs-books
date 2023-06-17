import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.entities';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class BooksService {
  
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  private books = [
    { name: "To Kill a Mockingbird", author: "Harper Lee" },
    { name: "1984", author: "George Orwell" },
    { name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { name: "Pride and Prejudice", author: "Jane Austen" },
    { name: "The Catcher in the Rye", author: "J.D. Salinger" },
    { name: "Moby-Dick", author: "Herman Melville" },
    { name: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { name: "Jane Eyre", author: "Charlotte Bronte" },
    { name: "Animal Farm", author: "George Orwell" },
    {  name: "The Odyssey", author: "Homer" },
    {  name: "Brave New World", author: "Aldous Huxley" },
    {  name: "The Chronicles of Narnia", author: "C.S. Lewis" },
    {  name: "The Hobbit", author: "J.R.R. Tolkien" },
    {  name: "Fahrenheit 451", author: "Ray Bradbury" },
    {  name: "Gone with the Wind", author: "Margaret Mitchell" },
    {  name: "The Harry Potter series", author: "J.K. Rowling" },
    {  name: "To Kill a Mockingbird", author: "Harper Lee" },
    {  name: "The Alchemist", author: "Paulo Coelho" },
    {  name: "The Little Prince", author: "Antoine de Saint-Exupéry" },
    {  name: "The Kite Runner", author: "Khaled Hosseini" }
  ];

  async findAll(limit: number, offset: number) {

    // const myBooks = [...this.books];
    // await this.bookRepository.insert(this.books)
    // return myBooks.splice(offset, limit);
    return await this.bookRepository.find({
      skip: offset,
      take: limit
    });

  }

  async findOne(id: number) {

    const queryString = `
      SELECT * 
        FROM books
        WHERE id = ${id};
    `;

    // const the_book = await this.bookRepository.findOne({where: { id }});

    const the_book = this.bookRepository.query(queryString)

    return the_book;
  }

  async create(bookObject: CreateBookDto) {
    
    const the_book = this.bookRepository.create(bookObject);

    return await this.bookRepository.save(the_book);

  }

  async update(id: number, bookObject: UpdateBookDto) {

    const the_book = this.bookRepository.preload({
      id,
      ...bookObject
    });

    if(!the_book) {
      throw new NotFoundException(`Not found`);
    }

    // return await this.bookRepository.save(the_book);

  }

  async delete(id: number) {

    const the_book = await this.bookRepository.findOne({where: { id }});

    return await this.bookRepository.remove(the_book);

  }

}
