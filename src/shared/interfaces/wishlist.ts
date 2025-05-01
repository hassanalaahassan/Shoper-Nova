import { IProducts } from "./products"

export interface IWishListResponse {
  status: string
  count: number
  data: IProducts[]
}


