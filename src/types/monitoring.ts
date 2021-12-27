export enum HeatLevelType {
  ALL = 0,
  Wen,
  Re,
  Fei,
  Bao
}

export type InstAttr = {
  instId: string
  instName: string
  [index: string]: any
}
