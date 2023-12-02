const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function run() {
  const newUser = await prisma.user.upsert({
    where: { email: 'alice.doe@tamere.com' },
    update: {},
    create: {
      firstName: 'Alice',
      username: 'alice.doe',
      email: 'alice.doe@tamere.com',
      password: '123456',
    },
  });
  console.log({ newUser });
}
run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
