//npx prisma db seed
//npx prisma migrate dev
import { PrismaClient, track_type } from "@prisma/client";
const prisma = new PrismaClient();

async function upsert(id: number, record: any) {
  await prisma.track.upsert({
    where: { id: id },
    update: {
      ...record,
    },
    create: {
      id: id,
      ...record,
      play_count: 0,
      favorite_count: 0,
    },
  });
}
async function main() {
  const host = "https://hiajoy.blob.core.windows.net";

  //await prisma.$queryRaw`delete from track;`
  let record: any;
  record = {
    title: "Calming sleep",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/005.jpg",
    audio_url: host + "/audios/sleep01.mp3",
    audio_type: "mp3",
    tags: ["sleep", "10 minutes", "meditation"],
    subtitle:
      "A peaceful sleep is within reach. Follow this guided sleep meditation to slow down and lead the mind into a deep sleep.",
    description: "",
    set: null,
    type: track_type.MEDITATION,
    relatedTo: {
      connect: [{ id: 20 }],
    },
  };
  await upsert(1, record);

  record = {
    title: "PT 101: Grounding",
    is_premium: false,
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session01.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "1",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }],
    },
  };

  await upsert(2, record);

  record = {
    title: "PT 101: Unhooking",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session02.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "2",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }],
    },
  };

  await upsert(3, record);

  record = {
    title: "PT 101: Acting on Values",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session03.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "3",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 7 }],
    },
    is_premium: true
  };

  await upsert(4, record);

  record = {
    title: "PT 101: Being kind",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session04.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "4",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 6 }, { id: 7 }],
    },
  };
  await upsert(5, record);

  record = {
    title: "PT 101: Making Room",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session05.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "5",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 7 }],
    },
  };
  await upsert(6, record);

  record = {
    title: "PT 101: Conclusion",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session06.mp3",
    audio_type: "mp3",
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "6",
    type: track_type.COURSE,
    relatedTo: {
      connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    },
  };
  await upsert(7, record);

  record = {
    title: "Sleep under a bonfire",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/033.jpg",
    audio_url: host + "/audios/10MinuteFireplace.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(8, record);

  record = {
    title: "Sleep along a steam",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/031.jpg",
    audio_url: host + "/audios/10MinuteStream.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(9, record);

  record = {
    title: "Sleep through a rainy night",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/030.jpg",
    audio_url: host + "/audios/10MinuteRainThunder.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(10, record);

  record = {
    title: "Sleep in a forest",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/036.jpg",
    audio_url: host + "/audios/10MinuteForestStream.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(11, record);

  record = {
    title: "Sleep on the beach",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/035.jpg",
    audio_url: host + "/audios/5MinuteWaves.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(12, record);

  record = {
    title: "Sleep in a windy night",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/032.jpg",
    audio_url: host + "/audios/10MinuteWind.mp3",
    audio_type: "mp3",
    tags: ["White noise", "Sleep sound"],
    subtitle: "Background noise for calming night",
    description:
      "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(13, record);

  record = {
    title: "5 min breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/004.jpg",
    audio_url: host + "/audios/2minute01.mp3",
    audio_type: "mp3",
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION,
  };
  await upsert(14, record);

  record = {
    title: "5 min breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/003.jpg",
    audio_url: host + "/audios/2minute02.mp3",
    audio_type: "mp3",
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION,
  };

  await upsert(15, record);

  record = {
    title: "5 min stomach meditation",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/015.jpg",
    audio_url: host + "/audios/10minute_stomach.mp3",
    audio_type: "mp3",
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION,
  };

  await upsert(16, record);

  record = {
    title: "I got this!",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/056.jpg",
    audio_url: host + "/audios/daily01.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "Today, I choose to embrace calm and peace within myself. I acknowledge that anxiety is a part of my journey, but it does not define me. I am stronger than my fears, and I have the power to navigate through any challenge that comes my way. I breathe deeply, grounding myself in the present moment. Each breath I take fills me with strength and clarity, and each exhale releases tension and worry. I am in control of my thoughts, and I choose to focus on what I can control. I am safe, I am capable, and I am enough. Today, I will take things one step at a time, celebrating small victories along the way. I trust myself to handle whatever comes my way, and I am deserving of peace and joy. I am resilient, I am brave, and I am worthy of a calm and happy mind. Let today be a reminder of my strength and my ability to rise above anxiety. I've got this.",
    set: "1",
    relatedTo: {
      connect: [{ id: 18 }, { id: 19 }, { id: 21 }, { id: 22 }],
    },
    type: track_type.AFFIRMATION,
  };

  await upsert(17, record);

  record = {
    title: "I do my best, and my best is enough.",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/057.jpg",
    audio_url: host + "/audios/daily02.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "I do my best, and my best is enough. I am here, present in this moment, and I choose to embrace myself fully. I do my best in everything I undertake, and my best is always enough. I release the need for perfection and instead honor the effort, love, and intention I pour into my actions. Each day, I grow, I learn, and I improve, but even now, I am worthy just as I am. My best is unique to me, and it is more than enough to create a meaningful and fulfilling life. I trust myself, I trust my journey, and I trust that my best is a gift to the world. I am enough, and I am at peace with who I am.",
    set: "2",
    relatedTo: {
      connect: [{ id: 17 }, { id: 19 }, { id: 21 }, { id: 22 }],
    },
    type: track_type.AFFIRMATION,
  };

  await upsert(18, record);

  record = {
    title: "I release fear and embrace the present moment with serenity.",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/059.jpg",
    audio_url: host + "/audios/daily03.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily", "default"],
    subtitle: "1 minute affirmation",
    description:
      "I release fear and embrace the present moment with serenity. Right now, I let go of all worries, doubts, and anxieties that no longer serve me. I am safe, grounded, and fully present in this moment. With each breath, I invite calmness and peace into my mind, body, and spirit. I trust the flow of life and know that I am exactly where I need to be. The present moment is a gift, and I choose to experience it with openness, gratitude, and serenity. I am free from fear, and I welcome the beauty and stillness of now. I am at peace. I am here. I am enough.",
    set: "2",
    relatedTo: {
      connect: [{ id: 17 }, { id: 18 }, { id: 21 }, { id: 22 }],
    },
    type: track_type.AFFIRMATION,
  };

  await upsert(19, record);

  record = {
    title: "Calming sleep 2",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/041.jpg",
    audio_url: host + "/audios/sleep02.mp3",
    audio_type: "mp3",
    tags: ["sleep", "20 minutes", "meditation"],
    subtitle: "Guided sleep meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION,
    relatedTo: {
      connect: [{ id: 1 }],
    },
  };
  await upsert(20, record);

  record = {
    title: "One day at a time, that is enough for me",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/060.jpg",
    audio_url: host + "/audios/daily04.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "Today, I choose peace over worry. I remind myself that I don't have to solve everything at once. I only need to focus on today. Each moment is manageable when I take it step by step. I release the need to control the future. Instead, I trust in my ability to handle whatever comes, one day at a time. My mind is calm, my heart is steady, and I give myself permission to move at my own pace. I am safe in this moment. I am enough as I am. Today, I choose progress over perfection, presence over panic. With each breath, I affirm: I take things one day at a time, and that is enough.",
    set: "4",
    relatedTo: {
      connect: [{ id: 17 }, { id: 18 }, { id: 19 }, { id: 22 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(21, record);

  record = {
    title: "I am competent",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/063.jpg",
    audio_url: host + "/audios/daily05.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "I am competent. I trust in my abilities and my strength. Even when anxiety arises, I remember that I am capable and resilient. I have faced challenges before, and I have overcome them. I am learning, growing, and improving every day. My mind may doubt, but my heart knows—I am enough. I release the need for perfection. I embrace progress. Every step I take, no matter how small, proves my competence. I breathe in confidence, and I exhale fear. I am in control of my thoughts, and I choose to believe in myself. I am competent. I am capable. I am calm. And I handle whatever comes my way with grace and strength.",
    set: "4",
    relatedTo: {
      connect: [{ id: 17 }, { id: 18 }, { id: 19 }, { id: 21 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(22, record);

  
  record = {
    title: "Just as I am",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/061.jpg",
    audio_url: host + "/audios/daily06.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "Today, I choose to honor and love myself unconditionally. I am worthy of kindness, respect, and joy just as I am. My flaws and imperfections make me beautifully human. I release self-judgment and embrace my unique strengths with gratitude. My heart is full of compassion, for others and for myself. I deserve happiness, peace, and love, and I allow it to flow freely into my life. I am enough, just as I am",
    set: "5",
    relatedTo: {
      connect: [{ id: 17 }, { id: 18 }, { id: 19 }, { id: 21 }, { id: 22 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(23, record);

  record = {
    title: "Compassion begins within me",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/055.jpg",
    audio_url: host + "/audios/daily07.mp3",
    audio_type: "mp3",
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description:
      "Today, I choose to lead with compassion. I open my heart to understanding, kindness, and empathy—for myself and others. I recognize that every person carries their own struggles, and I meet them with patience and love. My words and actions are guided by warmth and care, creating ripples of positivity in the world. I forgive freely, listen deeply, and offer support without judgment. Compassion begins within me, and I nurture it with gratitude and grace",
    set: "6",
    relatedTo: {
      connect: [{ id: 17 }, { id: 18 }, { id: 19 }, { id: 21 }, { id: 22 }, { id: 23 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(24, record);

  record = {
    title: "Box breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/151.jpg",
    audio_url: host + "/audios/breathing01.mp3",
    audio_type: "mp3",
    tags: ["breathing", "5 minute"],
    subtitle: "Breathing to Relax",
    description:
      "Box Breathing Meditation for Calm & Clarity",
    set: "6",
    relatedTo: {
      connect: [{ id: 17 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(25, record);

  record = {
    title: "Box breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/152.jpg",
    audio_url: host + "/audios/breathing02.mp3",
    audio_type: "mp3",
    tags: ["breathing", "5 minute"],
    subtitle: "Breathing to Relax",
    description:
      "Box Breathing Meditation for Calm & Clarity",
    set: "6",
    relatedTo: {
      connect: [{ id: 17 }],
    },
    type: track_type.AFFIRMATION,
  };
  await upsert(26, record);

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
