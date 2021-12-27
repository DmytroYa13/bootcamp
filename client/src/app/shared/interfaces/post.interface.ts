import { User } from "./user.interface";

export interface Post {
  author: User
  title: string
  subTitle: string
  content: string
  tags?: string[]
  likesQuantity?: number
  isLiked?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string
}
