export class FilterOptionsDto {
  readonly monthly: number[];
  readonly zone: string[];
  readonly facilities: {
    aircon: Boolean;
    furniture: Boolean;
    waterHeater: Boolean;
    TV: Boolean;
    fridge: Boolean;
    parking: Boolean;
    freeWifi: Boolean;
    keyCard: Boolean;
    CCTV: Boolean;
    luandry: Boolean;
  };
}
