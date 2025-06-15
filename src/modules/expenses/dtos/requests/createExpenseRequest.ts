import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateExpenseRequestDTO {
  @IsOptional()
  @IsInt()
  category_id: number;

  @IsOptional()
  @IsString()
  observation: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  essential: boolean;

  @IsBoolean()
  recurrent: boolean;

  @IsBoolean()
  has_installments: boolean;
}
