import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Admin user
  const hashedPassword = await bcrypt.hash("P@ssw0rd", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      isTwoFactorEnabled: false,
    },
  });

  // Seed products (if empty)
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          title: "Meditation Mala Beads",
          description: "Handcrafted mala beads for mantra meditation and daily grounding.",
          image: "/img/motivation.png",
          category: "MEDITATION_TOOLS",
          authorId: admin.id,
        },
        {
          title: "Amethyst Calm Crystal",
          description: "A calming crystal for stress relief, better sleep, and peaceful focus.",
          image: "/img/eco-friendly-house.jpg",
          category: "CRYSTALS",
          authorId: admin.id,
        },
        {
          title: "Beginner's Breathwork Guide (PDF)",
          description: "A downloadable guide to breathwork routines for energy, calm, and clarity.",
          image: "/img/blogging.jpeg",
          category: "DIGITAL_PRODUCTS",
          authorId: admin.id,
        },
      ],
    });

    const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    // Add versions
    if (products[0]) {
      await prisma.productVersion.createMany({
        data: [
          { productId: products[0].id, title: "Standard", price: 19.99 },
          { productId: products[0].id, title: "Premium", price: 29.99 },
        ],
      });
    }
    if (products[1]) {
      await prisma.productVersion.createMany({
        data: [
          { productId: products[1].id, title: "Small", price: 9.99 },
          { productId: products[1].id, title: "Large", price: 14.99 },
        ],
      });
    }
    if (products[2]) {
      await prisma.productVersion.createMany({
        data: [{ productId: products[2].id, title: "Download", price: 4.99 }],
      });
    }
  }

  // Seed gallery (if empty)
  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    await prisma.galleryImage.createMany({
      data: [
        { title: "Meditation Space", imageUrl: "/img/home-1.jpg", authorId: admin.id },
        { title: "Peaceful Practice", imageUrl: "/img/home-2.jpg", authorId: admin.id },
        { title: "Healing Session", imageUrl: "/img/home-3.jpg", authorId: admin.id },
        { title: "Nature Grounding", imageUrl: "/img/bg-hero.jpg", authorId: admin.id },
      ],
    });
  }

  // Seed testimonials (if empty)
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          author: "Sita",
          location: "Kathmandu",
          rating: 5,
          message: "The meditation session helped me sleep better from the first week. Gentle and powerful guidance.",
        },
        {
          author: "Arjun",
          location: "Pokhara",
          rating: 5,
          message: "Astrology reading was accurate and practical. I got clarity on my career decisions.",
        },
        {
          author: "Mina",
          location: "Lalitpur",
          rating: 4,
          message: "Sound healing brought deep calm. I felt lighter and more focused afterwards.",
        },
      ],
    });
  }

  // Seed posts (if empty)
  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "How to Start Meditation (Simple 7-Day Plan)",
          description: "A beginner-friendly roadmap to build consistency and calm.",
          banner: "/img/bg-hero-3.jpg",
          content:
            "Meditation doesn't need to be complicated. Start with 5 minutes daily, focus on breath, and gently return when distracted. Over 7 days, extend to 10–15 minutes, add journaling, and practice gratitude.",
          published: true,
          category: "MEDITATION",
          authorId: admin.id,
        },
        {
          title: "Vedic Astrology: What Your Birth Chart Can Reveal",
          description: "Understand the basics of houses, planets, and remedies.",
          banner: "/img/about-image-1.jpg",
          content:
            "Your birth chart is a map of tendencies and timing. Vedic astrology helps you understand cycles, strengths, and areas for growth—so you can make aligned choices.",
          published: true,
          category: "ASTROLOGY",
          authorId: admin.id,
        },
      ],
    });
  }

  console.log("✅ Seed completed (admin + content)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });