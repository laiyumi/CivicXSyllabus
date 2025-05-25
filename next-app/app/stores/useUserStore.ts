import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { Prisma } from "@prisma/client";
import { devtools } from "zustand/middleware";

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

// export const useUserStore = create<UserStore>((set) => ({
//   user: null,

//   setUser: (user) =>
//     set((state) => {
//       state.user = user;
//     }),

//   createList: (newList) =>
//     set((state) => {
//       if (state.user) {
//         state.user.lists.push(newList);
//       }
//     }),

//   renameList: (listId, newName) =>
//     set((state) => {
//       const list = state.user?.lists.find((l) => l.id === listId);
//       if (list) {
//         list.name = newName;
//       }
//     }),

//   addPostToList: (listId, post) =>
//     set((state) => {
//       if (!state.user) return;
//       const listIndex = state.user.lists.findIndex((l) => l.id === listId);
//       if (listIndex !== -1) {
//         state.user.lists[listIndex].posts.push(post);
//         state.user.lists[listIndex]._count.posts += 1;
//       }
//       console.log("post is added to list");
//     }),

//   removePostFromList: (listId, postId) =>
//     set((state) => {
//       const list = state.user?.lists.find((l) => l.id === listId);
//       if (list) {
//         const postIndex = list.posts.findIndex((p) => p.id === postId);
//         if (postIndex !== -1) {
//           list.posts.splice(postIndex, 1);
//           list._count.posts = Math.max(0, list._count.posts - 1);
//         }
//       }
//     }),

//   deleteList: (listId) =>
//     set((state) => {
//       if (state.user) {
//         state.user.lists = state.user.lists.filter((l) => l.id !== listId);
//       }
//     }),
// }));

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) =>
    set(
      produce((state) => {
        state.user = user;
      })
    ),

  createList: (newList) =>
    set(
      produce((state) => {
        if (state.user) {
          state.user.lists.push(newList);
        }
      })
    ),

  renameList: (listId, newName) =>
    set(
      produce((state) => {
        const list = state.user?.lists.find(
          (l: ListWithPosts) => l.id === listId
        );
        if (list) {
          list.name = newName;
        }
      })
    ),

  addPostToList: (listId, post) =>
    set(
      produce((state) => {
        if (!state.user) return; // Early returns work fine with manual produce
        const listIndex = state.user.lists.findIndex(
          (l: ListWithPosts) => l.id === listId
        );
        if (listIndex !== -1) {
          state.user.lists[listIndex].posts.push(post);
          state.user.lists[listIndex]._count.posts += 1;
        }
        console.log("post is added to list");
      })
    ),

  removePostFromList: (listId, postId) =>
    set(
      produce((state) => {
        if (!state.user) {
          confirm("User is not defined");
          return;
        }
        const list = state.user.lists.find(
          (l: ListWithPosts) => l.id === listId
        );
        if (list) {
          const postIndex = list.posts.findIndex((p: Post) => p.id === postId);
          if (postIndex !== -1) {
            list.posts.splice(postIndex, 1);
            list._count.posts = Math.max(0, list._count.posts - 1);
          }
        }
        console.log("post is removed from list");
      })
    ),

  deleteList: (listId) =>
    set(
      produce((state) => {
        if (state.user) {
          state.user.lists = state.user.lists.filter(
            (l: ListWithPosts) => l.id !== listId
          );
        }
      })
    ),
}));
