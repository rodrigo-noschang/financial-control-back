import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class GetExpensesSummaryQueryDTO {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
