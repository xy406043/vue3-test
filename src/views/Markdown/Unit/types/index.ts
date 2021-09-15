export type Catalogue = {
  path: String
  module: String
  [index: string]: any
}

export type Nav = {
  title: string
  index: number
  children: Array<Nav>
}
