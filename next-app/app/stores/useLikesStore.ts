import { create } from "zustand";

type LikesStore = {
  likesMap: Record<string, number>; // key = resourceId
  setLikes: (resourceId: string, count: number) => void;
  incrementLikes: (resourceId: string) => void;
  decrementLikes: (resourceId: string) => void;
};

export const useLikesStore = create<LikesStore>((set) => ({
  likesMap: {},
  setLikes: (id, count) =>
    set((state) => ({
      likesMap: { ...state.likesMap, [id]: count },
    })),
  incrementLikes: (id) =>
    set((state) => ({
      likesMap: {
        ...state.likesMap,
        [id]: (state.likesMap[id] ?? 0) + 1,
      },
    })),
  decrementLikes: (id) =>
    set((state) => ({
      likesMap: {
        ...state.likesMap,
        [id]: Math.max((state.likesMap[id] ?? 0) - 1, 0),
      },
    })),
}));
