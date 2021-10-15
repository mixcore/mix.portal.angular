export class Culture {
  specificulture: string;
  fullName: string;
  icon: string;

  constructor(value: ICulture) {
    this.specificulture = value.specificulture;
    this.fullName = value.fullName;
    this.icon = value.icon;
  }
}

export interface ICulture {
  specificulture: string;
  fullName: string;
  icon: string;
}
