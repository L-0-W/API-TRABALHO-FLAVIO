import { posts } from "../bd";
import { Post } from "../Interfaces";

export class PostData {
  buscarUltimoPostId = () => {
    try {
      return posts[posts.length - 1].id;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verificarBancoEstaVazio = () => {
    try {
      if (posts.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  inserirNovoPost = (
    novoPostId: number,
    title: string,
    content: string,
    authorsId: number,
  ) => {
    try {
      const date = new Date();

      const newPost: Post = {
        id: novoPostId,
        title: title,
        content: content,
        authorId: authorsId,
        createdAt: new Date(),
        published: false,
      };

      posts.push(newPost);

      return newPost;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buscarPostPorId = (id: number) => {
    try {
      const post = posts.filter((post) => post.id === id);
      return post;
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

  consultarTodosPosts = () => {
    try {
      return posts;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  salvarAtualizacaoPost = (
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

  excluirPostDoBanco = (index: number, id: number) => {
    try {
      posts.splice(index, 1);

      console.log("-> Data ~ Removendo valor");
      console.log(posts);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
