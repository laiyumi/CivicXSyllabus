import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Prisma } from "@prisma/client";

type UserWithLists = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        posts: {
          include: {
            categories: true;
            tags: true;
          };
        };
        _count: {
          select: { posts: true };
        };
      };
    };
  };
}>;

type ListWithPosts = UserWithLists["lists"][number]; // get the type of a list

type Post = Prisma.PostGetPayload<{
  include: {
    categories: true;
    tags: true;
  };
}>;

type UserStore = {
  user: UserWithLists | null;
  setUser: (user: UserWithLists) => void;
  createList: (newList: ListWithPosts) => void;
  renameList: (listId: string, newName: string) => void;
  addPostToList: (listId: string, post: Post) => void;
  removePostFromList: (listId: string, postId: string) => void;
  deleteList: (listId: string) => void;
};

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    user: null,

    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),

    createList: (newList) =>
      set((state) => {
        if (state.user) {
          state.user.lists.push(newList);
        }
      }),

    renameList: (listId, newName) =>
      set((state) => {
        const list = state.user?.lists.find((l) => l.id === listId);
        if (list) {
          list.name = newName;
        }
      }),

    addPostToList: (listId, post) =>
      set((state) => {
        const list = state.user?.lists.find((l) => l.id === listId);
        if (list) {
          list.posts.push(post);
          list._count.posts += 1;
        }
      }),

    removePostFromList: (listId, postId) =>
      set((state) => {
        const list = state.user?.lists.find((l) => l.id === listId);
        if (list) {
          list.posts = list.posts.filter((p) => p.id !== postId);
          list._count.posts = Math.max(0, list._count.posts - 1);
        }
      }),

    deleteList: (listId) =>
      set((state) => {
        if (state.user) {
          state.user.lists = state.user.lists.filter((l) => l.id !== listId);
        }
      }),
  }))
);
