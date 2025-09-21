import { posts, Post } from "../bd";

export class PostData {
  criarPost = (title: string, content: string, authorsId: number) => {
    try {
      let postId: number = 1;

      if (posts.length > 0) {
        postId = posts[posts.length - 1].id + 1;
      }

      const date = new Date();
      const newPost: Post = {
        id: postId,
        title: title,
        content: content,
        authorId: authorsId,
        createdAt: new Date(),
        published: false,
      };

      posts.push(newPost);

      return newPost;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarPostPorId = (id: number) => {
    try {
      const patchPost = posts.filter((post) => post.id === id);
      return patchPost;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarPostIndex = (id: number) => {
    try {
      let postIndex = 0;
      posts.forEach((post, index) => {
        post.id === id ? (postIndex = index) : "";
      });

      return postIndex;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarTodosPosts = () => {
    try {
      return posts;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  patchPost = (
    id: number,
    title?: string,
    content?: string,
    published?: boolean,
  ) => {
    try {
      posts
        .filter((post) => post.id === id)
        .map((post) => {
          title ? (post.title = title) : "";
          content ? (post.content = content) : "";
          published ? (post.published = published) : "";
        });

      return posts.filter((post) => post.id === id);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  removerPostId = (index: number, id: number) => {
    try {
      posts.splice(index, 1);
      console.log(posts);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
