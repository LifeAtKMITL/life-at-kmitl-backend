// DESC: using for api: get /subject
export class DormsDto {
  readonly dormId: string;
  readonly name: string;
  readonly tel: string;
  readonly address: string;
  readonly room: any[];
  readonly imagePath: string[];
  readonly zone: string[];
  readonly bills: any;
  readonly facilities: any[];
  readonly totalScore: any[];
  readonly rangePrice: number[];
}
