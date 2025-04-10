import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TAGS = [
  "Media",
  "Report & Article",
  "Thought Leadership",
  "Network",
  "Book",
  "Conference & Event",
  "Incubator & Accelerator",
  "Funding",
  "Playbook",
  "Case Study",
  "Job Board",
  "Apps",
  "Data",
];

const CATEGORIES = [
  "Access + (Dis)Ability",
  "Asking Questions",
  "Behavioral Economics",
  "Big Data",
  "Build With",
  "Building Trust",
  "Burnout",
  "Civic Research",
  "Civic Data",
  "Civic Tech",
  "Civic Design",
  "Civic Leadership",
  "Communication + Dissemination",
  "Consent",
  "Data Sharing",
  "Data Visualization",
  "Design Sprints",
  "Digital Twins",
  "Digital Services + Digital Equity",
  "Engagement",
  "Equity",
  "Equity in Analytics",
  "Evidence-Based Policy",
  "Forge Partnerships",
  "Indicators of Success or Failure",
  "Partnerships",
  "Power + Expertise + Equity",
  "Privacy",
  "Human-Center Design",
  "Ethical Data Practices",
  "Open Data",
  "Procurement",
  "Randomized Controlled Trials (RCTs)",
  "Responsible Tech",
  "Project Well-Being",
  "Project Design",
  "Project Execution",
  "Scale",
  "Thick Data",
  "User Experience",
];

async function main() {
  console.log("🌱 Seeding test database...");

  // Create user
  const user = await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "testuser@example.com",
      password: "123456",
      role: "USER",
    },
  });

  // Create source
  const source = await prisma.source.upsert({
    where: { name: "Civic Source" },
    update: {},
    create: { name: "Civic Source" },
  });

  // Create all categories
  const categoryRecords = await Promise.all(
    CATEGORIES.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Create all tags
  const tagRecords = await Promise.all(
    TAGS.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Create 10 example posts
  for (let i = 1; i <= 10; i++) {
    const post = await prisma.post.create({
      data: {
        title: `Example Post ${i}`,
        excerpt: `Excerpt for post ${i}`,
        content: `Detailed content for post ${i}`,
        year: 2025,
        published: true,
        link: `https://example.com/post-${i}`,
        imageUrl: `https://picsum.photos/800/600?random=${Math.random()}`,
        sourceId: source.id,
        categories: {
          connect: [
            {
              id: categoryRecords[
                Math.floor(Math.random() * categoryRecords.length)
              ].id,
            },
          ],
        },
        tags: {
          connect: [
            {
              id: tagRecords[Math.floor(Math.random() * tagRecords.length)].id,
            },
            {
              id: tagRecords[Math.floor(Math.random() * tagRecords.length)].id,
            },
          ],
        },
      },
    });

    // Optionally add to a list
    await prisma.list.upsert({
      where: { name_userId: { name: "Favorites", userId: user.id } },
      update: {
        posts: {
          connect: [{ id: post.id }],
        },
      },
      create: {
        name: "Favorites",
        userId: user.id,
        posts: {
          connect: [{ id: post.id }],
        },
      },
    });
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
