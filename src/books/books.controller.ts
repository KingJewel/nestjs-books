import { BooksService } from './books.service';
import { 
  Controller, 
  Get, 
  Param, 
  Post, 
  Body, 
  HttpCode,
  HttpStatus,
  Res,
  Put,
  Delete,
  Query
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';

@Controller('books')
export class BooksController {

  constructor( private readonly booksService: BooksService ) {}

  @Get()
  findAll(@Query() querySelector) {

    let { limit = 5, current_page = 1 } = querySelector;
    
    const the_books = this.booksService.findAll(limit, limit * (current_page - 1));

    return the_books;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {

    let the_book = this.booksService.findOne(id);

    return the_book;
  }

  @Post()
  add(@Body() createBookdto: CreateBookDto) {

    this.booksService.create(createBookdto);

    return `New Book successfully added ${JSON.stringify(createBookdto)}`;

  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    
    this.booksService.update(id, updateBookDto);

    return `Updated successfully`;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    
    this.booksService.delete(id);
    
    return `Deleted successfully id of ${id}`;

  }

}