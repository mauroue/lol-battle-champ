const MAX_CHAMP_ID = 10;

export const getRandomChamp: (exception?: number) => number = (exception) => {
  const championNum = Math.floor(Math.random() * MAX_CHAMP_ID + 1);

  if (championNum !== exception) return championNum;
  return getRandomChamp(exception);
};

export const getVoteOptions = () => {
  const leftId = getRandomChamp();
  const rightId = getRandomChamp(leftId);

  return [leftId, rightId];
};
