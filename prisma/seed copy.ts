//npx prisma db seed  
//npx prisma migrate dev
import { PrismaClient, track_type } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const host = "https://hiajoy.blob.core.windows.net";

  await prisma.$queryRaw`delete from track;`

  await prisma.track.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
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
      id: 2,
      title: "PT 101: Grounding",
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
      id: 2,
      title: "PT 101: Unhooking",
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
      id: 4,
      title: "PT 101: Acting on Values",
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
      id: 5,
      title: "PT 101: Being Kind",
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
      id: 6,
      title: "PT 101: Making Room",
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
      id: 7,
      title: "PT 101: Conclusion",
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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

  var record = {
    title: "5 min breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/003.jpg",
    audio_url: host + "/audios/2minute02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
  };

  await prisma.track.upsert({
    where: { id: 15 },
    update: {
      ...record,
    },
    create: {
      id: 15,
      ...record, 
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
