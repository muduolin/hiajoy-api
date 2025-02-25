//npx prisma db seed  
//npx prisma migrate dev
import { PrismaClient, track_type } from "@prisma/client";
const prisma = new PrismaClient();

async function upsert(id: number, record: any){
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
    audio_length: 0,
    tags: ["sleep", "10 minutes", "meditation"],
    subtitle: "Guided sleep meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(1, record);

  record = {
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
    set: "Powertools",
    type: track_type.COURSE
  };

  await upsert(2, record);

  record = {
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
    set: "Powertools",
    type: track_type.COURSE
  };

  await upsert(3, record);

  record = {
    title: "PT 101: Acting on Values",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "Powertools",
    type: track_type.COURSE
  };

  await upsert(4, record);

  record = {
    title: "PT 101: Being kind",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "Powertools",
    type: track_type.COURSE
  };
  await upsert(5, record);

  record = {
    title: "PT 101: Making Room",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "Powertools",
    type: track_type.COURSE
  };
  await upsert(6, record);

  record = {
    title: "PT 101: Conclusion",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "Powertools",
    type: track_type.COURSE
  };
  await upsert(7, record);


  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(8, record);

  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(9, record);

  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(10, record);

  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(11, record);

  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(12, record);

  record = {
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
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(13, record);


  record = {
    title: "5 min breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/004.jpg",
    audio_url: host + "/audios/2minute01.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION
  };
  await upsert(14, record);

  record = {
    title: "5 min breathing",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/003.jpg",
    audio_url: host + "/audios/2minute02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION
  };

  await upsert(15, record);
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
