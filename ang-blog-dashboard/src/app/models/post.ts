export interface Post {
  title: string,
  permalink: string,
  excerpt: string,
  category: {
    categoryId: string,
    categoryName: string
  },
  postImgPath: string,
  content: string,
  isFeatured: boolean,
  views: number,
  status: string,
  createdAt: Date
}
