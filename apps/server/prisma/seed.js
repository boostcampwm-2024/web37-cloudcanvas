const PrismaClient = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient.PrismaClient();
async function main() {
    const userAmount = 10;
    const users = [];
    for (let i = 0; i < userAmount; i++) {
        const userName = faker.person.fullName();
        users.push({ name: userName });
    }
    const addUser = async () => await prisma.user.createMany({ data: users });
    await addUser();

    const userDatas = await prisma.user.findMany({});
    const privateArchitectureAmountPerUser = 5;
    const privateArchitectures = [];
    userDatas.forEach((userData) => {
        for (let j = 0; j < privateArchitectureAmountPerUser; j++) {
            const privateArchitecture = {
                title: faker.book.title(),
                authorId: userData.id,
                architecture: {},
                updatedAt: new Date(),
                cost: parseFloat(faker.commerce.price()),
            };
            privateArchitectures.push(privateArchitecture);
        }
    });
    const addPrivateArchitectures = async () =>
        await prisma.privateArchitecture.createMany({
            data: privateArchitectures,
        });
    await addPrivateArchitectures();

    const privateArchitectureDatas = await prisma.privateArchitecture.findMany(
        {},
    );
    const privateArchitectureVersionAmountPerPrivateArchitecture = 3;
    const privateArchitectureVersions = [];
    privateArchitectureDatas.forEach((privateArchitectureData) => {
        for (
            let j = 0;
            j < privateArchitectureVersionAmountPerPrivateArchitecture;
            j++
        ) {
            const privateArchitectureVersion = {
                privateArchitectureId: privateArchitectureData.id,
                title: faker.git.commitSha(),
                architecture: {},
                cost: parseFloat(faker.commerce.price()),
            };
            privateArchitectureVersions.push(privateArchitectureVersion);
        }
    });
    const addPrivateArchitectureVersions = async () =>
        await prisma.version.createMany({
            data: privateArchitectureVersions,
        });
    await addPrivateArchitectureVersions();

    const publicArchitectureAmountPerUser = 5;
    const publicArchitectures = [];
    userDatas.forEach((userData) => {
        for (let i = 0; i < publicArchitectureAmountPerUser; i++) {
            const publicArchitecture = {
                title: faker.book.title(),
                authorId: userData.id,
                architecture: {},
                cost: parseFloat(faker.commerce.price()),
            };
            publicArchitectures.push(publicArchitecture);
        }
    });
    const addPublicArchitectures = async () =>
        await prisma.publicArchitecture.createMany({
            data: publicArchitectures,
        });
    await addPublicArchitectures();

    const userIds = [2, 4, 1, 3];
    const publicArchitectureDatas = await prisma.publicArchitecture.findMany(
        {},
    );
    const importedPublicArchitectures = [];
    publicArchitectureDatas.forEach((publicArchitectureData) => {
        userIds.forEach((userId) => {
            const importedPublicArchitecture = {
                publicArchitectureId: publicArchitectureData.id,
                userId: userId,
            };
            importedPublicArchitectures.push(importedPublicArchitecture);
        });
    });
    const addImportedPublicArchitectures = async () =>
        await prisma.import.createMany({
            data: importedPublicArchitectures,
        });
    await addImportedPublicArchitectures();

    const staredPublicArchitectures = [];
    publicArchitectureDatas.forEach((publicArchitectureData) => {
        userIds.forEach((userId) => {
            const staredPublicArchitecture = {
                publicArchitectureId: publicArchitectureData.id,
                userId: userId,
            };
            staredPublicArchitectures.push(staredPublicArchitecture);
        });
    });
    const addstaredPublicArchitectures = async () =>
        await prisma.star.createMany({
            data: staredPublicArchitectures,
        });
    await addstaredPublicArchitectures();

    const tagAmount = 8;
    const tags = [];
    for (let i = 0; i < tagAmount; i++) {
        const tag = {
            name: faker.word.verb({ length: { max: 15 } }),
        };
        tags.push(tag);
    }
    const addTags = async () => await prisma.tag.createMany({ data: tags });
    await addTags();

    const tagIds = [1, 2, 4, 5];
    const taggedPublicArcitectures = [];
    publicArchitectureDatas.forEach((publicArchitectureData) => {
        tagIds.forEach((tagId) => {
            const taggedPublicArchitecture = {
                publicArchitectureId: publicArchitectureData.id,
                tagId: tagId,
            };
            taggedPublicArcitectures.push(taggedPublicArchitecture);
        });
    });
    const addTaggedPublicArchitectures = async () =>
        await prisma.publicArchitectureTag.createMany({
            data: taggedPublicArcitectures,
        });
    await addTaggedPublicArchitectures();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
