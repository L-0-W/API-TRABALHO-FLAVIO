import { posts, users } from "../bd";
import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";

export class PostBusiness {
  postData = new PostData();

  verificiarPost = (
    title: string,
    content: string,
    authorId: number,
    userBusiness: UserBusiness,
  ) => {
    try {
      if (title.length < 3) {
        throw new Error("Titulo menor que 3");
      }

      if (content.length < 10) {
        throw new Error("Content menor que 10");
      }

      const userExist = userBusiness.verifyId(Number(authorId));

      if (!userExist || userExist.length <= 0) {
        throw new Error("Usuario não existe");
      }

      const post = this.postData.criarPost(title, content, authorId) as any;

      if (!post || post.length < 0) {
        throw new Error("Erro ao criar post");
      }

      return post;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buscarTodosPosts = () => {
    try {
      return this.postData.buscarTodosPosts();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  patchVerificar = (
    id: number,
    title: string,
    content: string,
    published: boolean,
  ) => {
    try {
      if (id <= 0) {
        throw new Error("ID invalido; > 0");
      }

      if (this.postData.buscarPostPorId(id).length <= 0) {
        throw new Error("Post não existe");
      }

      return this.postData.patchPost(
        id,
        title ? title : undefined,
        content ? content : undefined,
        published ? published : undefined,
      );
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verificarDelete = (
    post_id: number,
    user_id: number,
    userBusiness: UserBusiness,
  ) => {
    try {
      if (user_id <= 0) {
        throw new Error("Usuario invalido");
      }

      const postDelete = this.postData.buscarPostPorId(post_id);
      const userDeleting = userBusiness.verifyId(user_id);

      if (postDelete.length <= 0) {
        throw new Error("Post não existe");
      }

      if (
        postDelete[0].authorId != user_id &&
        userDeleting[0].admin === false
      ) {
        throw new Error("Usuario Não Permitido");
      }

      const index = this.postData.buscarPostIndex(post_id);

      console.log(posts[index]);

      if (index < 0) {
        throw new Error("Index de Post menor que 0");
      }

      this.postData.removerPostId(index, post_id);

      return postDelete;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buscarPostPorUsuario = (user_id: number) => {
    try {
      if (posts.length <= 0) {
        return [];
      }

      return posts.filter((post) => post.authorId === user_id);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
