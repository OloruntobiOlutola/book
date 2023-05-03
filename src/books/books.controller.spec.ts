import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksDto } from './dto/books.dto';
import {v4} from 'uuid';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entity/books';

describe('BooksController', () => {
  let controller: BooksController;
  let fakeBooksService: Partial<BooksService>;

  beforeEach(async () => {
    fakeBooksService = {
      createBook: (book: BooksDto) => {
        return {
          id: 1,
          ...book
        }
      },

      updateBook: (id: string, book: UpdateBookDto) => {
        return Promise.resolve({
          id,
          title: book.title ? book.title : 'original',
          content: book.content ? book.content : 'original'
        })
      },

      getBook: (id: string) => {
        return Promise.resolve({
        id,
        title: 'foo',
        content: 'content'
      })
    },

    getBooks: () =>{
      return Promise.resolve([{
        id: '1',
        title: 'foo',
        content: 'content'
      } as Books])
    },

    deleteBook: (id: string) => {}
    }


    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: fakeBooksService
        }
      ]
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a book',  () => {
    const book =  controller.createBook({title: 'foo', content: 'Test'});
    expect(book).toBeDefined();
    expect(book.id).toBeDefined();
    expect(book.title).toEqual('foo');
    expect(book.content).toEqual('Test');

  })

  it('findBook return a book with given id', () => {
    const book = controller.getBook('1')
    expect(book).toBeDefined();
  });

  it('findBooks return all the books', () => {
    const books = controller.getBooks();
    expect(books).toBeDefined();
  })

  it('updateBook should update a book with given id', async () => {
    const book = await controller.updateBook('1', {title: 'Hello World'})
    
    expect(book).toBeDefined();
    expect(book.title).toEqual('Hello World');
    expect(book.content).toEqual('original');
  })

  it ('DeleteBook should delete a book', () => {
    expect(controller.deleteBook('1'))
    .toBe(undefined);
  })

});
