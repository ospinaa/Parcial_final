import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class ListLoanRequestsDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  toolId?: number;
}

