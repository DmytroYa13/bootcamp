import { Author } from "./author.interface";
import { Tag } from "./tags.interface";

export interface Post {
  author: Author
  title: string
  subTitle: string
  content: string
  tags?: Tag[]
  likes?: number
  isLiked?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string
}
