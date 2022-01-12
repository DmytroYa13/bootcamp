import { Author } from "./author.interface";

export interface Post {
  author: Author
  title: string
  subTitle: string
  content: string
  tags?: string[]
  likes?: number
  isLiked?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string
}
