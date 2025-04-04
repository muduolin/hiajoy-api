import express, { Request, Response } from "express";
import { User, Journal, Task } from "./lib/types";
import { isValidEmail, trimEndChar } from "./lib/util";
import { email, user } from "@prisma/client";
import Sentiment from "sentiment";

export async function getUserByEmail(req: Request, email: string) {
  try {
    const user = await req.app.locals.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      include: {
        profile: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function getUserById(req: Request, id: string) {
  try {
    const user = await req.app.locals.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function createUser(
  req: Request,
  email: string,
  password: string,
  provider: string = ""
) {
  try {
    const created = await req.app.locals.prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {},
      create: {
        email: email.toLowerCase(),
        password: password,
        provider: provider,
        profile: {
          create: {},
        },
      },
    });
    return created;
  } catch {
    return null;
  }
}

export async function updateUser(req: Request, user: User) {
  try {
    const updated = req.app.locals.prisma.user.update({
      where: { id: user.id },
      data: {
        avatar: user.avatar,
        password: user.password,
        provider: user.provider,
        username: user.username,
        expiredAt: user.expiredAt,
        profile: {
          update: {
            points: user.points,
            affirmTrackId: user.affirmTrackId ?? null,
          },
        },
      },
    });

    return updated;
  } catch {
    return null;
  }
}

export async function pointsIncrement(
  req: Request,
  id: String,
  increment: Number
) {
  try {
    const updated = req.app.locals.prisma.user.update({
      where: { id: id },
      data: {
        profile: {
          update: {
            points: { increment: increment },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return updated;
  } catch {
    return null;
  }
}

export async function updateAffirmationTrackId(
  req: Request,
  id: String,
  track_id: Number
) {
  try {
    const updated = req.app.locals.prisma.user.update({
      where: { id: id },
      data: {
        profile: {
          update: {
            affirmTrackId: track_id,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return updated;
  } catch {
    return null;
  }
}

export async function deleteUser(req: Request, id: string) {
  try {
    const deleted = await req.app.locals.prisma.user.delete({
      where: { id: id },
    });

    return deleted;
  } catch (e) {
    return null;
  }
}

export async function getJournal(
  req: Request,
  id: string,
  page: number = 0,
  pageSize: number = 10
) {
  try {
    const offset = +pageSize * +page;

    const records = await req.app.locals.prisma.journal.findMany({
      where: {
        userId: id,
      },
      skip: offset,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return records;
  } catch {
    return null;
  }
}

export async function createJournal(
  req: Request,
  userId: string,
  title: string,
  content: string
) {
  try {
    const sentiment = new Sentiment();
    const senti = sentiment.analyze(title + " " + content);
    console.log(senti);

    const record = await req.app.locals.prisma.journal.create({
      data: {
        userId: userId,
        title: title,
        content: content,
        mood: senti.score,
      },
    });

    return record;
  } catch {
    return null;
  }
}

export async function updateJournal(
  req: Request,
  id: string,
  journal: Journal
) {
  try {
    const sentiment = new Sentiment();
    const senti = sentiment.analyze(journal.title + " " + journal.content);
    console.log(journal.id);
    const journals = await req.app.locals.prisma.journal.update({
      where: {
        userId: id,
        id: journal.id,
      },
      data: {
        title: journal.title,
        content: journal.content,
        mood: senti.score,
      },
    });
    return journals;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function deleteJournal(req: Request, userId: string, id: number) {
  try {
    const entity = await req.app.locals.prisma.journal.delete({
      where: {
        userId: userId,
        id: id,
      },
    });
    return entity;
  } catch {
    return null;
  }
}

export async function searchEmail(req: Request, email: string) {
  try {
    const emails = await req.app.locals.prisma.email.findMany({
      where: {
        email: email.toLowerCase(),
      },
    });
    return emails;
  } catch {
    return false;
  }
}

export async function createEmail(req: Request, email: string) {
  email = email.toLowerCase();
  if (!isValidEmail(email)) return null;
  try {
    console.log("prisma upsert email: " + email);
    const entity = await req.app.locals.prisma.email.upsert({
      where: {
        email: email
      },
      create: { email: email },
      update: { email: email },
    });
    console.log(entity) 
    return entity;
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function updateEmail(req: Request, email: email) {
  try {
    if (!isValidEmail(email.email!)) return null;

    const updated = await req.app.locals.prisma.email.update({
      where: {
        email: email.email?.toLowerCase()
      },
      data: {
        code: email.code,
        sendEmail: email.sendEmail,
        sendEmailAt: email.sendEmailAt,
        codeExpiredAt: email.codeExpiredAt,
      },
    });
    return updated;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteEmail(req: Request, email: string) {
  try {
    const entity = await req.app.locals.prisma.email.delete({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    return entity;
  } catch {
    return null;
  }
}

export async function getFavoriteTracks(req: Request, id: string) {
  try {
    const entity = await req.app.locals.prisma.user_track.findMany({
      where: {
        userId: id,
      },
      include: {
        track: true,
      },
    });
    console.log(entity);
    return entity;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createFavoriteTrack(
  req: Request,
  userId: string,
  track_id: number
) {
  try {
    const record = await req.app.locals.prisma.user_track.create({
      data: {
        userId: userId,
        trackId: track_id,
      },
      include: {
        track: true,
      },
    });

    return record;
  } catch (e) {
    return null;
  }
}

export async function deleteFavoriteTrack(
  req: Request,
  userId: string,
  track_id: number
) {
  try {
    const record = await req.app.locals.prisma.user_track.delete({
      where: { userId_trackId: { userId: userId, trackId: track_id } },
    });

    return record;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getTask(
  req: Request,
  id: string,
  page: number = 0,
  pageSize: number = 10
) {
  try {
    const offset = +pageSize * +page;

    const records = await req.app.locals.prisma.task.findMany({
      where: {
        userId: id,
      },
      skip: offset,
      take: pageSize,
    });
    return records;
  } catch {
    return null;
  }
}

export async function createTask(
  req: Request,
  userId: string,
  name: string,
  description: string
) {
  try {
    const record = await req.app.locals.prisma.task.create({
      data: {
        userId: userId,
        name: name,
        description: description,
      },
    });

    return record;
  } catch {
    return null;
  }
}

export async function updateTask(req: Request, userId: string, task: Task) {
  try {
    const journals = await req.app.locals.prisma.task.update({
      where: {
        userId: userId,
        id: task.id,
      },
      data: {
        name: task.name,
        description: task.description,
        isComplete: task.isComplete,
        updatedAt: new Date(),
      },
    });
    return journals;
  } catch {
    return null;
  }
}

export async function deleteTask(req: Request, userId: string, id: number) {
  try {
    const entity = await req.app.locals.prisma.task.delete({
      where: {
        userId: userId,
        id: id,
      },
    });
    return entity;
  } catch {
    return null;
  }
}
