import { beforeEach, describe, expect, it } from "vitest";
import { ListPaginatedCategoriesService } from "./ListPaginatedCategoriesService";
import { InMemoryCategoriesRepository } from "../repositories/test/InMemoryCategoriesRepository";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: ListPaginatedCategoriesService;

const categoriesLettersForAlphabeticalSorting = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
];

describe('List Paginated Categories Service', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new ListPaginatedCategoriesService(categoriesRepository);
  });

  it('Should list categories paginated', async () => {
    for (let i = 0; i <= 20; i++) {
      const categoryLetter = categoriesLettersForAlphabeticalSorting[i % 7];

      await categoriesRepository.create(`Category ${categoryLetter}`);
    }

    const { categories, total, has_more } = await sut.execute({ page: 1 });

    expect(total).toBe(21);
    expect(has_more).toBe(true);
    expect(categories).toHaveLength(15);
  });

  it('Should list categories paginated and sorted - page 1', async () => {
    for (let i = 0; i <= 20; i++) {
      const categoryLetter = categoriesLettersForAlphabeticalSorting[i % 7];

      await categoriesRepository.create(`Category ${categoryLetter}`);
    }

    const { categories } = await sut.execute({ page: 1 });

    expect(categories[0].name).toBe('Category A');
    expect(categories[14].name).toBe('Category E');
  });

  it('Should list categories paginated and sorted - page 2', async () => {
    for (let i = 0; i <= 20; i++) {
      const categoryLetter = categoriesLettersForAlphabeticalSorting[i % 7];

      await categoriesRepository.create(`Category ${categoryLetter}`);
    }

    const { categories } = await sut.execute({ page: 2 });

    expect(categories[0].name).toBe('Category F');
    expect(categories[5].name).toBe('Category G');
  });
});
