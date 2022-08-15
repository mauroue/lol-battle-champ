import { Champions } from "twisted/dist/constants/champions";

export const getVoteOptions = () => {
  const leftId = getRandomChampByName();
  const rightId = getRandomChampByName(leftId);

  return [leftId, rightId];
};

export const getRandomChampByName: (exception?: number) => number = (
  exception?: number
) => {
  const data = getListOfChampions();
  const selectedChamp = data[Math.floor(Math.random() * data.length + 1)];

  if (selectedChamp[1] !== exception) return Number(selectedChamp[1]);

  return getRandomChampByName(Number(selectedChamp[1]));
};

export const getListOfChampions = () => {
  const objKeys = Object.entries(Champions);
  const data = objKeys.filter((value) => {
    if (typeof value[1] === "number") return true;
  });

  return data;
};
