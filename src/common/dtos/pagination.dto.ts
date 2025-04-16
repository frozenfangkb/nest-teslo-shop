import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}
