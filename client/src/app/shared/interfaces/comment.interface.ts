import { Author } from "./author.interface";

export interface PostComment {
  author: Author
  content?: string
  postId?: string
  createdAt?: string
  updatedAt?: string
}
