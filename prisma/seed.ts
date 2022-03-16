import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { LocationCreateArgs } from '@/types/location';

const db = new PrismaClient();

async function main() {
  const seeds = yaml.load(
    readFileSync(path.resolve(__dirname, 'seeds/locations.yml'), 'utf-8')
  ) as LocationCreateArgs[];

  for (const data of seeds) {
    await db.location.create({
      data,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
