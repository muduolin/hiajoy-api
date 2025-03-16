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
    is_premium: false,
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session01.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "1",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 3}, {id: 4}, { id: 5}, {id: 6},{ id: 7}]
    }
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
    set: "2",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 2}, {id: 4}, { id: 5}, {id: 6},{ id: 7}]
    }
  };

  await upsert(3, record);

  record = {
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
    set: "3",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 2}, {id: 3}, { id: 5}, {id: 6},{ id: 7}]
    }
  };

  await upsert(4, record);

  record = {
    title: "PT 101: Being kind",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/034.jpg",
    audio_url: host + "/audios/session04.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["Courses", "Powertools"],
    subtitle: "A course for managing stress",
    description:
      "Powertools teaches you the essential skills to handle difficult situations",
    set: "4",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 2}, {id: 3}, { id: 4}, {id: 6},{ id: 7}]
    }
  };
  await upsert(5, record);

  record = {
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
    set: "5",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 2}, {id: 3}, { id: 4}, {id: 5},{ id: 7}]
    }
  };
  await upsert(6, record);

  record = {
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
    set: "6",
    type: track_type.COURSE,
    relatedTo: {
      connect: [ { id: 2}, {id: 3}, { id: 4}, {id: 5},{ id: 6}]
    }
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

  record = {
    title: "5 min stomach meditation",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/015.jpg",
    audio_url: host + "/audios/10minute_stomach.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["short", "5 minutes", "meditation"],
    subtitle: "Guided breathing meditation",
    description: "",
    set: null,
    type: track_type.MEDITATION
  };

  await upsert(16, record);

  record = {
    title: "I got this!",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/018.jpg",
    audio_url: host + "/audios/daily01.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description: "Today, I choose to embrace calm and peace within myself. I acknowledge that anxiety is a part of my journey, but it does not define me. I am stronger than my fears, and I have the power to navigate through any challenge that comes my way. I breathe deeply, grounding myself in the present moment. Each breath I take fills me with strength and clarity, and each exhale releases tension and worry. I am in control of my thoughts, and I choose to focus on what I can control. I am safe, I am capable, and I am enough. Today, I will take things one step at a time, celebrating small victories along the way. I trust myself to handle whatever comes my way, and I am deserving of peace and joy. I am resilient, I am brave, and I am worthy of a calm and happy mind. Let today be a reminder of my strength and my ability to rise above anxiety. I've got this.",
    set: "1",
    type: track_type.AFFIRMATION
  };

  await upsert(17, record);

  record = {
    title: "I do my best, and my best is enough.",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/014.jpg",
    audio_url: host + "/audios/daily02.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["affirmation", "1 minute", "daily"],
    subtitle: "1 minute affirmation",
    description: "I do my best, and my best is enough. I am here, present in this moment, and I choose to embrace myself fully. I do my best in everything I undertake, and my best is always enough. I release the need for perfection and instead honor the effort, love, and intention I pour into my actions. Each day, I grow, I learn, and I improve, but even now, I am worthy just as I am. My best is unique to me, and it is more than enough to create a meaningful and fulfilling life. I trust myself, I trust my journey, and I trust that my best is a gift to the world. I am enough, and I am at peace with who I am.",
    set: "2",
    type: track_type.AFFIRMATION
  };

  await upsert(18, record);

  record = {
    title: "I release fear and embrace the present moment with serenity.",
    author: "Hiajoy Inc.",
    image_url: host + "/images/main/042.jpg",
    audio_url: host + "/audios/daily03.mp3",
    audio_type: "mp3",
    audio_length: 0,
    tags: ["affirmation", "1 minute", "daily","default"],
    subtitle: "1 minute affirmation",
    description: "I release fear and embrace the present moment with serenity. Right now, I let go of all worries, doubts, and anxieties that no longer serve me. I am safe, grounded, and fully present in this moment. With each breath, I invite calmness and peace into my mind, body, and spirit. I trust the flow of life and know that I am exactly where I need to be. The present moment is a gift, and I choose to experience it with openness, gratitude, and serenity. I am free from fear, and I welcome the beauty and stillness of now. I am at peace. I am here. I am enough.",
    set: "2",
    type: track_type.AFFIRMATION
  };

  await upsert(19, record);
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
