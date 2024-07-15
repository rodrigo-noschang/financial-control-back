import { beforeEach, describe, expect, it } from "vitest";
import { DeleteCategoryService } from "./DeleteCategoryService";
import { InMemoryCategoriesRepository } from "../repositories/test/InMemoryCategoriesRepository";
import { CreateCategoryService } from "./CreateCategoryService";

let sut: DeleteCategoryService;
let categoriesRepository: InMemoryCategoriesRepository;

let createCategoryService: CreateCategoryService;

describe('Delete Category Service', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new DeleteCategoryService(categoriesRepository);

    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it('should delete category', async () => {
    const firstCategory = await createCategoryService.execute({ name: 'Category 1' });
    await sut.execute({ id: firstCategory.id });

    const deletedCategory = await categoriesRepository.findById(firstCategory.id);

    expect(deletedCategory).toBe(null);
  })
})