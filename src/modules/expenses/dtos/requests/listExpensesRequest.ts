import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";

export class ListExpensesRequestDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page_size: number = DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
