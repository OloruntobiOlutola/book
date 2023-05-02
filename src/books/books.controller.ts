import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/books.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {

  constructor(private booksService: BooksService ){}
  
  @Post()
  async createBook(@Body() book: BooksDto) {
    return await this.booksService.createBook(book)
  }

  @Get()
  async getBooks() {
    return await this.booksService.getBooks();
  }

  @Get('/:id')
  async getBook(@Param('id') id: string) {
    return await this.booksService.getBook(id);
  }

  @Patch('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: UpdateBookDto
  ) {
    return await this.booksService.updateBook(id, body);
  }

  @Delete('/:id')
  async deleteBook (@Param('id') id: string) {
    return await this.booksService.deleteBook(id);
  }

}
