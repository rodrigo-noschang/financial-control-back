import { beforeEach, describe, expect, it } from 'vitest';

import { CreateCategoryService } from './CreateCategoryService';
import { InMemoryCategoriesRepository } from '../repositories/test/InMemoryCategoriesRepository';

let inMemoryRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryService;

describe('Create Category Service', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryCategoriesRepository();
    sut = new CreateCategoryService(inMemoryRepository);
  })


  it('should be able to create a new category', async () => {
    const createdCategory = await sut.execute({
      name: 'New Category',
    });

    expect(createdCategory.id).toEqual(expect.any(String));
    expect(createdCategory.name).toEqual('New Category');
  })
})