export class FilterOptionsDto {
  readonly monthly: number[];
  readonly zone: string[];
  readonly facilities: Utility[];
}

export interface Utility {
  utl: string;
  value: boolean;
}
