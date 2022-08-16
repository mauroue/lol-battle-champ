import DATA from "./data.json";

export const getVoteOptions = () => {
  const leftId = getRandomChampById();
  const rightId = getRandomChampById(leftId);

  return [leftId, rightId];
};

export const getRandomChampById: (exception?: number) => number = (
  exception?: number
) => {
  const data = getListOfChampions();
  const selectedChamp = data[Math.floor(Math.random() * data.length + 1)];

  if (selectedChamp[1].id !== exception) return selectedChamp[1].id;

  return getRandomChampById(Number(selectedChamp[1]));
};

export const getListOfChampions = () => {
  const champList = Object.entries(DATA);

  return champList;
};
