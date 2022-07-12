import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const locations = [
  {
    "name": "Boulders Sydhavn",
    "lat":  55.64150064210359,
    "lon": 12.5403738496244,
    "type": "Indoor",
    "facilites": []
  },
  {
    "name": "Blocs & Walls",
    "lat":  55.6929831357626,
    "lon": 12.61123307695427,
    "type": "Mixed",
    "facilites": []
  }, 
  {
    "name": "Beta Boulders (South)",
    "lat":  55.65752743580151,
    "lon": 12.55120468197333,
    "type": "Indoor",
    "facilites": []
  },
  {
    "name": "Boulders Valby",
    "lat":  55.6626596595672,
    "lon": 12.51670074289131,
    "type": "Indoor",
    "facilites": []
  },
  {
    "name": "Beta Boulders (West)",
    "lat":  55.68414958518454,
    "lon": 12.4941272736554,
    "type": "Indoor",
    "facilites": []
  },
  {
    "name": "Nørrebro Klatreklub",
    "lat":  55.69986985468348,
    "lon": 12.5426527100713,
    "type": "Indoor",
    "facilites": []
  },
  {
    "name": "BaNanna Park",
    "lat":  55.69987231457118,
    "lon": 12.54977395376524,
    "type": "Outdoor",
    "facilites": []
  }
]

async function main() {
    // Do stuff
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });