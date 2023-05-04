import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { HttpException } from '@nestjs/common';
import { Books } from './entity/books';

describe('BooksService', () => {
  let service: BooksService;
  let _books: Books[];

  beforeEach(async () => {
    _books = [
      {
        id: '1',
        title: 'My First Book',
        content: 'My First Book content',
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'BOOK',
          useValue: _books,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('getBooks should return all books', async () => {
    const books = await service.getBooks();
    expect(books.length).toBe(1);
  });

  it('getBook should return a book given its id', async () => {
    const book = await service.getBook('1');
    expect(book).toEqual({
      id: '1',
      title: 'My First Book',
      content: 'My First Book content',
    });
  });

  // it('createBook should create a book', () => {
  //   const book = service.createBook({ title: 'title', content: 'content' });

  //   expect(book.id).toBeDefined();
  //   expect(book.title).toEqual('title');
  //   expect(book.content).toEqual('content');
  // });

  // it('throws an error if book id is not found', async () => {
  //   expect(service.updateBook('2', { title: 'title' })).rejects.toThrow(
  //     HttpException,
  //   );
  // });

  // it('should update a book given a book id', async () => {
  //   const book = service.updateBook('1', {title: 'new title'});
  //   expect(book).toEqual({
  //       id: '1',
  //       title: 'new title',
  //       content: 'content'
  //   })
  // })
});
