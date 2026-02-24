import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Primary Admin — meditationastro1@gmail.com (password: best@977##??)
  const primaryHash = await bcrypt.hash("best@977##??", 10);
  const admin = await prisma.user.upsert({
    where: { email: "meditationastro1@gmail.com" },
    update: { password: primaryHash, role: UserRole.ADMIN, name: "Niaadim Admin" },
    create: {
      name: "Niaadim Admin",
      email: "meditationastro1@gmail.com",
      password: primaryHash,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      isTwoFactorEnabled: false,
    },
  });

  // Secondary Admin — admin@gmail.com (password: P@ssw0rd)
  const hashedPassword = await bcrypt.hash("P@ssw0rd", 10);
  await prisma.user.upsert({
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
          description: "A beginner-friendly roadmap to build consistency and inner calm through daily practice.",
          banner: "/img/bg-hero-3.jpg",
          content: "Meditation doesn't need to be complicated. Start with 5 minutes daily, focus on breath, and gently return when distracted. Over 7 days, extend to 10–15 minutes, add journaling, and practice gratitude. Day 1: Sit comfortably, close eyes, breathe naturally for 5 minutes. Day 2: Observe thoughts without judgment — imagine clouds passing. Day 3: Body scan from feet to crown. Day 4: Loving-kindness — send love to yourself and others. Day 5: Walking meditation outdoors. Day 6: Mantra repetition with mala beads. Day 7: Silent sitting with pure awareness. Consistency is the key — even 5 minutes daily transforms your mind over months.",
          published: true,
          category: "MEDITATION",
          authorId: admin.id,
        },
        {
          title: "Vedic Astrology: What Your Birth Chart Can Reveal",
          description: "Understand the basics of houses, planets, Nakshatras and karmic remedies in Jyotish.",
          banner: "/img/about-image-1.jpg",
          content: "Your birth chart is a map of tendencies and timing. Vedic astrology, known as Jyotish (Science of Light), uses the sidereal zodiac — the actual positions of stars in the sky. The 12 houses represent areas of life: 1st house is self, 4th is home, 7th is relationships, 10th is career. Each of the 9 planets (Graha) carries specific energy: Sun for authority, Moon for emotions, Mars for courage, Mercury for intellect, Jupiter for wisdom, Venus for love, Saturn for karma, Rahu for worldly desires, Ketu for spiritual liberation. Understanding your chart helps you make aligned choices.",
          published: true,
          category: "ASTROLOGY",
          authorId: admin.id,
        },
        {
          title: "Nishruti Meditation: Transcending the Planes of Hearing",
          description: "Explore the three stages of sacred hearing — Shruti, Anusruti, and Nishruti — developed by spiritual teacher Niaadim.",
          banner: "/img/home-1.jpg",
          content: "Nishruti Meditation is a transformative system that maps the journey of consciousness through sound. Shruti (श्रुति) is what is heard — the outer sacred revelation, like Vedic mantras received by ancient rishis. Anusruti (अनुश्रुति) is what follows — the internalization of teachings through disciplined practice and a teacher's guidance. Nishruti (निश्रुती) is transcendental hearing — the soundless sound, the Anahata Nada that arises spontaneously from within. This is not produced by striking two objects together. It is the primordial vibration of consciousness itself. Through the techniques of Nirati (effortless observation), Nishruti (inner listening), and Nispaersh (letting go), practitioners dissolve the boundary between the listener and the sound.",
          published: true,
          category: "SPIRITUALITY",
          authorId: admin.id,
        },
        {
          title: "Neuroplasticity & Meditation: How Ancient Practices Rewire the Brain",
          description: "Modern neuroscience confirms what yogis have known for millennia — meditation physically changes your brain.",
          banner: "/img/about-image-2.jpg",
          content: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. When you meditate regularly, measurable changes occur in brain structure and function. The prefrontal cortex — responsible for attention, decision-making, and self-awareness — grows thicker in long-term meditators. The amygdala, the brain's fear center, shows decreased activity and even reduced gray matter density. The default mode network, associated with mind-wandering and self-referential thoughts, quiets down. Harvard research showed that 8 weeks of daily meditation increased gray matter density in the hippocampus (learning and memory) and decreased it in the amygdala (stress). Combine this with Vedic breathwork techniques like Nadi Shodhana and Bhramari, and you have a complete neuroplastic mind acceleration protocol.",
          published: true,
          category: "WELLNESS",
          authorId: admin.id,
        },
        {
          title: "A Spiritual Travel Guide to Nepal's Sacred Sites",
          description: "From Pashupatinath to Lumbini — discover the most transformative pilgrimage destinations in Nepal.",
          banner: "/img/bg-hero.jpg",
          content: "Nepal is a living spiritual laboratory. Kathmandu Valley alone contains 7 UNESCO World Heritage Sites, most of them sacred temples and stupas. Pashupatinath Temple is one of the most sacred Hindu temples in the world, dedicated to Lord Shiva. Witness ancient cremation ceremonies and encounter sadhus (wandering ascetics) adorned with ash. Boudhanath Stupa — the world's largest Buddhist stupa — emanates a tangible field of peace. Circle the stupa clockwise (pradakshina) while spinning prayer wheels. Swayambhunath (Monkey Temple) perches on a hill overlooking Kathmandu, its all-seeing Buddha eyes gazing in all directions. Namo Buddha, 40km east of Kathmandu, is where Prince Siddhartha (before becoming Buddha) offered his body to a starving tigress — a place of extraordinary compassion energy. Lumbini is the birthplace of Siddhartha Gautama. Walking on the same ground where the Buddha was born is a deeply moving experience.",
          published: true,
          category: "SPIRITUALITY",
          authorId: admin.id,
        },
        {
          title: "Understanding Chakras: The 7 Energy Centers and How to Balance Them",
          description: "A comprehensive guide to the seven chakras — their qualities, imbalances, and healing practices.",
          banner: "/img/home-2.jpg",
          content: "The chakra system maps seven primary energy centers along the spine, each governing specific aspects of physical, emotional, and spiritual health. Muladhara (Root) — at the base of spine. Governs survival, security, grounding. Balanced: feels safe, stable. Imbalanced: fear, anxiety, financial stress. Healing: earthing, red foods, Muladhara mantras. Svadhisthana (Sacral) — governs creativity, sexuality, pleasure. Anahata (Heart) — love, compassion, connection. The heart chakra bridge between lower and upper centers. Healing: green foods, heart-opening yoga poses, metta meditation. Vishuddha (Throat) — authentic expression and truth. Ajna (Third Eye) — intuition, wisdom, inner vision. Sahasrara (Crown) — connection to universal consciousness and divine. Tibetan singing bowls tuned to specific frequencies can rebalance chakras rapidly. Each bowl note corresponds to a chakra, creating resonance that dissolves energetic blockages.",
          published: true,
          category: "WELLNESS",
          authorId: admin.id,
        },
        {
          title: "Mantras for Daily Transformation: A Beginner's Practice Guide",
          description: "How to select, chant, and internalize Vedic mantras for healing, protection, and spiritual growth.",
          banner: "/img/home-3.jpg",
          content: "The word mantra comes from two Sanskrit roots: 'manas' (mind) and 'trana' (liberation). A mantra is literally a tool for liberating the mind. Mantras work through vibration — when chanted correctly, they create specific resonances in the body and activate particular energy patterns. Gayatri Mantra: 'Om Bhur Bhuva Svaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat' — the universal prayer for illumination, clarity of intellect and divine light. Mahamrityunjaya Mantra: For healing, protection, and transcending death. Om Namah Shivaya: The most accessible Shiva mantra, meaning 'I bow to Shiva (the inner self)'. For beginners, choose one mantra and chant it 108 times daily for 40 days. Use a mala (prayer beads) to count. Over time, the mantra becomes internalized and arises spontaneously — this is called 'ajapa japa', the mantra that chants itself.",
          published: true,
          category: "MINDFULNESS",
          authorId: admin.id,
        },
        {
          title: "Rahu and Ketu: Understanding Your Karmic Axis in Vedic Astrology",
          description: "The nodes of the Moon hold the key to your soul's evolutionary journey across lifetimes.",
          banner: "/img/about-main-image.jpg",
          content: "Rahu and Ketu are not physical planets but the lunar nodes — points where the Moon's orbit intersects the ecliptic. In Vedic astrology, they represent the axis of karma and dharma, past and future, attachment and liberation. Ketu (South Node) represents what your soul has already mastered in previous lives. Its placement shows accumulated wisdom but also blind spots and areas of disinterest. Rahu (North Node) represents your soul's current evolutionary direction — the unfamiliar territory you came to explore. It drives ambition, obsession, and sometimes confusion. The Rahu-Ketu axis reveals your deepest karmic patterns. Understanding this axis helps you work with life's currents rather than against them. Remedies for Rahu include chanting Durga mantras and wearing hessonite (gomedh). Remedies for Ketu include cat's eye gemstone and Ganesha mantras.",
          published: true,
          category: "ASTROLOGY",
          authorId: admin.id,
        },
        {
          title: "The Science of Pranayama: Breath as the Bridge Between Body and Spirit",
          description: "A deep dive into yogic breathing techniques that regulate the nervous system and expand consciousness.",
          banner: "/img/home-4.jpg",
          content: "Prana means 'life force' and ayama means 'extension or expansion'. Pranayama is thus the expansion of vital life force through conscious breath regulation. The autonomic nervous system has two branches: sympathetic (fight or flight) and parasympathetic (rest and digest). Most people are chronically overstimulated in sympathetic mode. Pranayama directly shifts this balance. Nadi Shodhana (Alternate Nostril Breathing): Balances left and right hemispheres of the brain. Left nostril (Ida nadi) activates the right brain and parasympathetic system. Right nostril (Pingala nadi) activates left brain and sympathetic. Alternate breathing balances both. Bhramari (Humming Bee Breath): The internal vibration from humming stimulates the vagus nerve, reducing cortisol and inducing immediate calm. Kapalabhati (Skull-Shining Breath): Rapid exhales purify the lungs, massages abdominal organs, and clears mental fog. Wim Hof Method and Holotropic Breathwork are modern adaptations of these ancient techniques.",
          published: true,
          category: "WELLNESS",
          authorId: admin.id,
        },
        {
          title: "Ayurveda and Astrology: How Your Dosha Connects to Your Birth Chart",
          description: "The sister sciences of Ayurveda and Jyotish reveal the constitutional blueprint of your body-mind-soul.",
          banner: "/img/young-man-ayurvedic-medicine.png",
          content: "Ayurveda (Science of Life) and Jyotish (Vedic Astrology) are sister sciences from the same Vedic tradition. Together they form a complete system for understanding the human being. In Ayurveda, everything is made of the five elements (Panchamahabhutas): Earth, Water, Fire, Air, and Space. These combine into three doshas: Vata (Air + Space), Pitta (Fire + Water), Kapha (Earth + Water). Your birth chart reveals your doshic constitution. Mars and the Sun indicate Pitta. Saturn and Rahu indicate Vata. Moon, Jupiter, and Venus indicate Kapha. Imbalances in your chart correspond to likely doshic imbalances. A Saturn-afflicted chart often shows Vata excess — anxiety, dryness, irregularity. Mars-dominant charts show Pitta — inflammation, anger, overheating. Understanding this connection allows precise Ayurvedic treatments aligned with your astrological periods. During a Rahu Mahadasha, for instance, Vata-pacifying practices like warm oil massage (Abhyanga) and grounding foods are especially beneficial.",
          published: true,
          category: "WELLNESS",
          authorId: admin.id,
        },
      ],
    });
  }

  // Seed Blog Posts from Nishruti document content
  const blogCount = await prisma.post.count();
  if (blogCount === 0) {
    const blogPosts = [
      {
        title: "Nishruti Meditation: Transcending the Planes of Hearing",
        description: "Discover the sacred progression from Shruti to Anusruti to Nishruti — a transformative journey from outer sound to the soundless awareness within.",
        content: `<h2>What is Nishruti Meditation?</h2><p>Nishruti Meditation, developed by spiritual teacher Niaadim, is a transformative approach that explores the sacred progression of hearing in meditation — from the physical to the transcendental.</p><h2>The Three Planes of Hearing</h2><h3>Shruti (श्रुति) — "That Which Is Heard"</h3><p>The foundation of divine knowledge. It refers to sacred revelations like the Vedas — external, yet profound. Heard and received as sacred truths. In practice, this is learning to truly listen to the world around you without labeling or judgment.</p><h3>Anusruti (अनुश्रुति) — "That Which Follows"</h3><p>The internalization of teachings through guidance and disciplined practice. It reflects the seeker's commitment to wisdom passed down by teachers. Here, listening turns inward — following breath, heartbeat, and the subtle energies of the body.</p><h3>Nishruti (निश्रुती) — "Transcendental Hearing"</h3><p>A state beyond physical sound — the soundless sound. It arises spontaneously, unstruck by dual events, and represents the singularity of self-awareness. This is the Anahata Nada — the unstruck sound of pure consciousness.</p><h2>Core Techniques</h2><p><strong>Nirati — Effortless Observation:</strong> Focused attention on the present moment — breath and bodily sensations — without judgment. Simply being present to what is.</p><p><strong>Nishruti — Inner Listening:</strong> Tuning into subtle internal sounds such as heartbeat or breath, enabling transcendence and deeper awareness beyond ordinary sensory experience.</p><p><strong>Nispaersh — Letting Go:</strong> A practice of visualizing the release of thoughts and emotions, fostering emotional calm and mental clarity through non-attachment.</p><h2>Beginning Your Practice</h2><p>Start with 15 minutes daily. Find a quiet space, sit comfortably, and begin with Shruti — simply listening. Notice every sound without naming it. Then gently turn attention inward toward breath. This is enough to begin.</p>`,
        published: true,
        category: "MEDITATION" as any,
        tags: ["TECHNIQUES", "PHILOSOPHY", "BEGINNERS"] as any[],
        authorId: admin.id,
      },
      {
        title: "How Vedic Astrology Can Transform Your Life",
        description: "Unlike Western astrology, Vedic Jyotish offers precise life timing, karmic insight, and practical remedies. Discover what your birth chart truly reveals.",
        content: `<h2>Vedic Astrology: An Ancient Science for Modern Seekers</h2><p>Vedic astrology — or Jyotish, meaning "the eye of the Vedas" — is one of humanity's oldest and most sophisticated systems for understanding human life in relationship to cosmic cycles.</p><h2>What Makes Vedic Astrology Different?</h2><p>Unlike its Western counterpart, Vedic astrology uses the sidereal zodiac — based on the actual positions of stars as they appear in the sky today. This makes it far more astronomically precise. More importantly, Vedic astrology uses the Nakshatra system (27 lunar mansions) and the Dasha system — planetary periods that allow accurate timing of life events with remarkable precision.</p><h2>Your Birth Chart: A Map of the Soul</h2><p>In Vedic astrology, your birth chart (Janma Kundali) is viewed not just as a personality profile but as a map of your soul's journey — your karma, dharma, and the specific lessons and gifts you carry from past lives. The Lagna (Ascendant), Moon sign, and the strength of planetary placements reveal your core nature, challenges, and greatest potentials.</p><h2>The Dasha System: Life Timing</h2><p>One of the most powerful aspects of Vedic astrology is the Dasha system — a sequence of planetary periods that govern different phases of your life. Knowing which Dasha you are in can explain why certain periods feel expansive while others feel contracted, and what opportunities or challenges lie ahead.</p><h2>Practical Remedies</h2><p>Unlike Western astrology, which often remains descriptive, Vedic astrology offers active remedies: specific mantras, gemstones, charitable acts, and rituals that can help balance challenging planetary influences. These are not superstitions — they are practical tools for aligning with cosmic rhythms.</p><h2>Booking a Reading</h2><p>A personalized Vedic astrology reading with Niaadim includes your full birth chart analysis, current Dasha period assessment, and specific remedial recommendations. Sessions are available online internationally.</p>`,
        published: true,
        category: "ASTROLOGY" as any,
        tags: ["PHILOSOPHY", "BEGINNERS", "ZODIAC"] as any[],
        authorId: admin.id,
      },
      {
        title: "Neuroplasticity & Meditation: When Science Meets Spirit",
        description: "Modern neuroscience confirms what ancient meditators knew: sustained practice physically rewires the brain. Here is what the research shows.",
        content: `<h2>The Meeting Point of Ancient Wisdom and Modern Science</h2><p>For thousands of years, Vedic practitioners described meditation as a practice that fundamentally changes how a person experiences reality — their perception, emotional responses, and sense of self. Modern neuroscience is now confirming these claims with measurable precision.</p><h2>What is Neuroplasticity?</h2><p>Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. Until the late 20th century, scientists believed the adult brain was largely fixed. We now know this is false: the brain continuously reshapes itself based on our experiences, habits, and practices.</p><h2>What Meditation Does to the Brain</h2><p>Research from Harvard, Stanford, and Max Planck Institute shows that regular meditation practice:</p><ul><li>Thickens the prefrontal cortex (responsible for focus, decision-making, and emotional regulation)</li><li>Reduces the size and reactivity of the amygdala (the brain's fear and stress center)</li><li>Increases gray matter density in the insula (interoceptive awareness — feeling what's happening in the body)</li><li>Strengthens connectivity between the default mode network and task-positive networks</li></ul><h2>The Nishruti Approach</h2><p>The Nishruti Meditation method developed by Niaadim works precisely with these neuroplastic mechanisms. The Nirati technique trains non-judgmental observation — directly strengthening prefrontal regulation. The deep listening of Nishruti cultivates interoceptive awareness. The Nispaersh letting-go practice reduces amygdala reactivity.</p><h2>Practical Application</h2><p>You don't need to understand neuroscience to benefit from meditation. But knowing the science can motivate consistent practice. Even 15-20 minutes daily for 8 weeks produces measurable structural brain changes. Consistency matters far more than duration.</p>`,
        published: true,
        category: "MINDFULNESS" as any,
        tags: ["SCIENCE", "TECHNIQUES", "ADVANCED"] as any[],
        authorId: admin.id,
      },
      {
        title: "Mantras for Daily Transformation: A Practical Guide",
        description: "From the Gayatri to Om Namah Shivaya — how to choose, practice, and integrate sacred Sanskrit mantras into everyday life for measurable transformation.",
        content: `<h2>What Is a Mantra?</h2><p>The Sanskrit word mantra derives from 'man' (mind) and 'tra' (tool/instrument). A mantra is literally a tool for the mind — a sacred sound or phrase that, when repeated with concentration and intention, creates specific vibrational effects in consciousness.</p><h2>How Mantras Work</h2><p>Mantras work through multiple pathways simultaneously. At the physical level, rhythmic recitation activates the vagus nerve and promotes parasympathetic nervous system dominance — the "rest and digest" state. At the subtler level, Vedic tradition holds that specific sounds carry inherent energies corresponding to particular cosmic principles.</p><h2>The Power of Sanskrit</h2><p>Sanskrit is considered a particularly potent language for mantra because its sounds are said to be directly mapped to the vibrational structure of reality itself — each syllable corresponding to specific chakra energies and cosmic forces. The precise pronunciation matters.</p><h2>How to Choose Your Mantra</h2><p>In the Vedic tradition, the most powerful mantra for you depends on your birth chart — specifically your Lagna, Moon sign, and current Dasha period. A Jyotish consultation with Niaadim can identify your specific planetary mantra for maximum benefit. However, certain universal mantras — like the Gayatri and Om Namah Shivaya — are beneficial for almost everyone.</p><h2>Starting Your Practice</h2><p>Begin with just 108 repetitions daily at a fixed time. Morning is traditionally recommended. Use a mala (rosary of 108 beads) to count. After 40 consecutive days of unbroken practice, notice what has shifted in your experience. This 40-day cycle is known as a Sadhana and produces deep integration.</p><h2>The Gayatri Mantra</h2><p>ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥</p><p>Translation: "We meditate on the divine light of the solar deity who illuminates all three worlds. May he inspire our intellect and guide us toward righteousness." This is considered the universal mantra par excellence — safe, powerful, and available to all.</p>`,
        published: true,
        category: "SPIRITUALITY" as any,
        tags: ["TECHNIQUES", "PRACTICE", "HEALING"] as any[],
        authorId: admin.id,
      },
      {
        title: "Nepal Spiritual Travel: Sacred Sites & Inner Journeys",
        description: "Nepal is not just a travel destination — it is a living temple. A guide to the most spiritually significant sites and how to approach them with awareness.",
        content: `<h2>Nepal: The World's Spiritual Heartland</h2><p>Nepal is unique in the world — a country where spirituality is not practiced in dedicated hours but is woven into the very fabric of daily life. The temples, stupas, monasteries, and sacred mountains are not tourist attractions but living centers of devotion that have been active for over 2,000 years.</p><h2>Pashupatinath Temple, Kathmandu</h2><p>One of the most sacred Shiva temples in the world, Pashupatinath sits on the banks of the Bagmati River. Witnessing the evening Aarti ceremony here is a profound experience — flames, chanting, priests, and the sense of millennia of human devotion condensed into a single evening. Note: only Hindus may enter the inner sanctum, but the outer areas and ghats are accessible to all.</p><h2>Boudhanath Stupa: The Heart of Tibetan Buddhism</h2><p>One of the largest Buddhist stupas in the world, Boudhanath is surrounded by Tibetan monasteries and is a center of living Buddhist practice. Walking the kora (circumambulation) at dawn with monks, pilgrims, and locals spinning prayer wheels is one of Nepal's most moving experiences.</p><h2>Swayambhunath — The Monkey Temple</h2><p>Atop a hill overlooking Kathmandu Valley, Swayambhunath's all-seeing eyes gaze in four directions from its golden spire. The climb up 365 steps (one for each day of the year) is itself a practice. The panoramic view of the valley at sunrise is unforgettable.</p><h2>Lumbini: Where the Buddha Was Born</h2><p>Lumbini may be the most quietly powerful of Nepal's sacred sites. In the Mayadevi Temple grove, you can stand on the exact spot where Siddhartha Gautama is believed to have been born 2,600 years ago. The peace is palpable and difficult to describe.</p><h2>How to Approach Sacred Sites</h2><p>The greatest transformation at sacred sites comes not from seeing them as tourists but from arriving with intention. Before entering any temple, pause and set a silent sankalpa (intention). Remove shoes with reverence. Maintain silence where silence is observed. Offer something — even just a flower or incense. These simple acts shift your experience from sightseeing to pilgrimage.</p>`,
        published: true,
        category: "SPIRITUALITY" as any,
        tags: ["LIFESTYLE", "PRACTICE", "HISTORY"] as any[],
        authorId: admin.id,
      },
      {
        title: "Understanding Your Dosha: The Ayurvedic Map of Your Nature",
        description: "Vata, Pitta, or Kapha? Understanding your Ayurvedic constitution is the foundation of living in harmony with your natural rhythms — and your astrology.",
        content: `<h2>What is a Dosha?</h2><p>In Ayurveda — the ancient Indian science of life — all of existence is composed of five elements: earth, water, fire, air, and space. These elements combine in three fundamental biological energies called Doshas: Vata (air + space), Pitta (fire + water), and Kapha (earth + water). Every person has all three doshas, but in a unique ratio that determines their prakriti (natural constitution).</p><h2>Vata: The Energy of Movement</h2><p>Vata governs all movement in the body and mind — breathing, circulation, nervous impulses, and thought. Vata types tend to be creative, quick-thinking, enthusiastic, and versatile. When balanced, they are energetic and communicative. When imbalanced, they experience anxiety, insomnia, digestive irregularity, and scattered thinking. Vata is governed astrologically by Saturn and Rahu.</p><h2>Pitta: The Energy of Transformation</h2><p>Pitta governs digestion and transformation — of food, information, and experiences. Pitta types are sharp, focused, passionate, and decisive. When balanced, they are brilliant leaders and accomplished achievers. When imbalanced, they experience anger, inflammation, hyperacidity, and perfectionism. Pitta is governed astrologically by the Sun and Mars.</p><h2>Kapha: The Energy of Structure</h2><p>Kapha governs structure, stability, and lubrication — the "glue" that holds the body together. Kapha types are steady, loyal, patient, and nurturing. When balanced, they are deeply grounded and emotionally stable. When imbalanced, they experience weight gain, lethargy, attachment, and depression. Kapha is governed astrologically by Jupiter and the Moon.</p><h2>Ayurveda and Vedic Astrology Together</h2><p>One of the most powerful integrations in traditional Vedic science is combining Jyotish (astrology) with Ayurveda. Your birth chart reveals your dominant doshas and shows which planetary periods tend to aggravate or pacify them. A combined Jyotish-Ayurveda consultation with Niaadim creates an extraordinarily precise picture of how to live in alignment with your deepest nature.</p>`,
        published: true,
        category: "WELLNESS" as any,
        tags: ["BEGINNERS", "PHILOSOPHY", "LIFESTYLE"] as any[],
        authorId: admin.id,
      },
    ];
    
    for (const post of blogPosts) {
      await prisma.post.create({ data: post });
    }
    console.log("✅ 6 blog posts seeded");
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