import { create } from "zustand";
import { Category } from "@prisma/client";
import { devtools } from "zustand/middleware";

export interface Topic {
  name: string;
}

export interface Topics {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
}

export const useTopicStore = create(
  devtools<Topic>(
    (set) => ({
      name: "Books",
      setTopic: (name: string) => set(() => ({ name })),
    }),
    { name: "topic", store: "topic" }
  )
);

export const useTopicsStore = create(
  devtools<Topics>(
    (set) => ({
      topics: [{ name: "Books" }, { name: "Movies" }, { name: "Music" }],
      setTopics: (topics: Topic[]) => set(() => ({ topics })),
    }),
    { name: "topics", store: "topics" }
  )
);
