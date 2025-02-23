//npx prisma db seed  
//npx prisma migrate dev
import { PrismaClient, track_type } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const host = "https://hiajoy.blob.core.windows.net";

  await prisma.$queryRaw`truncate track restart identity cascade;`

  await prisma.track.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Calming night",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/005.jpg",
      audio_url: host + "/audios/sleep01.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["sleep", "10 minutes", "meditation"],
      subtitle: "Guided sleep meditation",
      description: "",
      play_count: 0,
      favorite_count: 0,
      set: null,
      type: track_type.MEDITATION
    },
  });

  await prisma.track.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session01.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session02.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session03.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session04.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session05.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 7 },
    update: {},
    create: {
      title: "Powertools 101",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/034.jpg",
      audio_url: host + "/audios/session06.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["Courses", "Powertools"],
      subtitle: "A course for managing stress",
      description:
        "Powertools teaches you the essential skills to handle difficult situations",
      play_count: 0,
      favorite_count: 0,
      set: "Powertools",
    },
  });

  await prisma.track.upsert({
    where: { id: 8 },
    update: {},
    create: {
      title: "Sleep under a bonfire",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/033.jpg",
      audio_url: host + "/audios/10MinuteFireplace.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 9 },
    update: {},
    create: {
      title: "Sleep along a steam",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/031.jpg",
      audio_url: host + "/audios/10MinuteStream.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 10 },
    update: {},
    create: {
      title: "Sleep through a rainy night",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/030.jpg",
      audio_url: host + "/audios/10MinuteRainThunder.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 11 },
    update: {},
    create: {
      title: "Sleep in a forest",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/036.jpg",
      audio_url: host + "/audios/10MinuteForestStream.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 12 },
    update: {},
    create: {
      title: "Sleep on the beach",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/035.jpg",
      audio_url: host + "/audios/5MinuteWaves.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 13 },
    update: {},
    create: {
      title: "Sleep in a windy night",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/032.jpg",
      audio_url: host + "/audios/10MinuteWind.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["White noise", "Sleep sound"],
      subtitle: "Background noise for calming night",
      description:
        "The white noise will help you stop the intrusive thoughts and get you into a good night sleep",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

  await prisma.track.upsert({
    where: { id: 14 },
    update: {},
    create: {
      title: "5 min breathing",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/004.jpg",
      audio_url: host + "/audios/2minute01.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["short", "5 minutes", "meditation"],
      subtitle: "Guided breathing meditation",
      description: "",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });
  await prisma.track.upsert({
    where: { id: 15 },
    update: {},
    create: {
      title: "5 min breathing",
      author: "Hiajoy Inc.",
      image_url: host + "/images/main/003.jpg",
      audio_url: host + "/audios/2minute02.mp3",
      audio_type: "mp3",
      audio_length: 0,
      tags: ["short", "5 minutes", "meditation"],
      subtitle: "Guided breathing meditation",
      description: "",
      play_count: 0,
      favorite_count: 0,
      set: null,
    },
  });

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
