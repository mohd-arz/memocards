import { atom } from "recoil";

export const cardsAtom = atom({
  key: "cardsAtom",
  default: [],
});

export const selectedCardsAtom = atom({
  key: "selectedCardsAtom",
  default: [],
});

export const modeAtom = atom({
  key: "modeAtom",
  default: null,
});

export const maxAtom = atom({
  key: "maxAtom",
  default: 0,
});
