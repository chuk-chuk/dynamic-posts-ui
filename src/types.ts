export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}
