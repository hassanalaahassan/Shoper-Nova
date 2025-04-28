
import { ICategory, ISubcategory } from "./categories"

export interface IProductsResponse {
  results: number
  metadata: Metadata
  data: IProducts[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}
export interface IProducts {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}



export interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
}
