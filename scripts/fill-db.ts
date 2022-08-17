import { prisma } from '../backend/utils/prisma';
import { DATA } from '../utils/data.js';

const doBackFill = async () => {
  const champData = DATA.map((p, index) => ({
    id: p.id,
    name: p.name,
    imgUrl: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.alias}_0.jpg`
  }));

  const creation = await prisma.champion.createMany({ data: champData });
  console.log('created?', creation);
};

doBackFill();
