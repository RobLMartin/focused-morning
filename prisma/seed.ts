import { db } from "../app/utils/db.server";

async function seed() {
  const journals = getJournals();
  const users = getUsers();

  for (const user of users) {
    await db.user.create({
      data: user,
    });
  }

  for (const journal of journals) {
    await db.journal.create({
      data: journal,
    });
  }
}

seed();

function getJournals() {
  return [
    {
      id: "7689f01d-cb03-4f85-9a78-9ca081948013",
      title: "Journal 1",
      content: {
        time: 1670819523373,
        blocks: [
          { data: { text: "Monday, January 2nd", level: 2 }, type: "header" },
          {
            data: {
              text: "Hello world! This is a new journal entry.",
            },
            type: "paragraph",
          },
        ],
        version: "2.18.0",
      },
      userId: "ef5de94a-a657-4eb6-918b-5e998f0d6778",
    },
  ];
}

function getUsers() {
  return [
    {
      id: "ef5de94a-a657-4eb6-918b-5e998f0d6778",
      name: "Robert Martin",
      email: "Rob@virtu.studio",
    },
  ];
}
