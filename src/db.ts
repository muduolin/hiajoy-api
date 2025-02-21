import express, { Request, Response } from "express";
import { User, Journal } from "./lib/types";
import { isValidEmail, trimEndChar } from "./lib/util";
import { email } from "@prisma/client";


export async function getUserByEmail(req: Request, email: string) {
  const client = await req.app.locals.pool.connect();

  const query = `SELECT * FROM "user" Where email=\'${email}\'`;

  const result = await client.query(query);
  client.release();

  return result.rows ? (result.rows[0] as User) : null;
}

export async function getUserById(req: Request, id: number) {
  const client = await req.app.locals.pool.connect();

  const query = `SELECT * FROM "user" Where id=\'${id}\'`;
  const result = await client.query(query);
  client.release();

  return result.rows ? (result.rows[0] as User) : null;
}

export async function createUser(
  req: Request,
  email: string,
  password: string,
  provider: string = ""
) {
  const client = await req.app.locals.pool.connect();

  const query = `INSERT INTO "user"
    (email, password, provider)
      SELECT '${email}', '${password}', '${provider}'
      WHERE
      NOT EXISTS (
        SELECT id FROM "user" WHERE email = '${email}'
    );`;

  const result = await client.query(query);
  client.release();

  return result.rowCount > 0;
}

export async function updateUser(req: Request, user: User) {
  const client = await req.app.locals.pool.connect();

  // construct set
  var params = "";
  params += user.avatar ? ` avatar='${user.avatar}', ` : "";
  params += user.password ? ` password='${user.password}', ` : "";
  params += user.provider ? ` provider='${user.provider}', ` : "";
  params += user.username ? ` username='${user.username}', ` : "";
  params += user.expiredAt ? ` expiredAt='${user.expiredAt}', ` : "";

  params = trimEndChar(params.trimEnd(), ",");
  const query = `Update "user" SET ${params} WHERE id = '${user.id}';`;

  const result = await client.query(query);
  console.log(query);
  client.release();

  return result.rowCount > 0;
}

export async function deleteUser(req: Request, id: number) {
  const client = await req.app.locals.pool.connect();

  const query = `DELETE FROM "user" Where id=${id}`;
  console.log(query);
  const result = await client.query(query);
  client.release();

  return result.rowCount > 0;
}

export async function getJournal(
  req: Request,
  id: number,
  page: number = 0,
  pageSize: number = 10
) {
  const offset = +pageSize * +page;
  const client = await req.app.locals.pool.connect();

  const query = `SELECT id, title, content, "createdAt" FROM "journal"  WHERE "userId"=${id} order by "createdAt" desc limit ${pageSize} offset ${offset}`;

  const result = await client.query(query);
  client.release();

  return result.rows ? (result.rows as Journal[]) : null;
}

export async function createJournal(
  req: Request,
  id: number,
  title: string,
  content: string
) {
  const client = await req.app.locals.pool.connect();

  const query = `INSERT INTO "journal"
    (title, content, "userId")
      Values ('${title}', '${content}', '${id}')
      RETURNING id, title, content, "createdAt"
      ;`;

  const result = await client.query(query);

  client.release();
  return result.rowCount > 0 ? (result.rows[0] as Journal) : null;
}

export async function updateJournal(
  req: Request,
  id: number,
  journal: Journal
) {
  try {
    const journals = await req.app.locals.prisma.journal.update({
      where: {
        userId: id,
        id: journal.id,
      },
      data: {
        title: journal.title,
        content: journal.content,
      },
    });
    return journals;
  } catch {
    return null;
  }
}

export async function deleteJournal(
  req: Request,
  userId: number,
  id: number

) {
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

export async function searchEmail(
  req: Request,
  email: string
) {
  try {
    const emails = await req.app.locals.prisma.email.findMany({
      where: {
        email: email
      }
    })
    return emails;
  } catch {
    return false;
  }
}

export async function createEmail(
  req: Request,
  email: string
) {
  if(!isValidEmail(email))
    return null;
  try {
    const entity = await req.app.locals.prisma.email.upsert({
      where: {email: email},
      create: {email: email},
      update: {email: email}
    });
    return entity;
  } catch (e) {
    return null;
  }
}

export async function updateEmail(
  req: Request,
  email: email
) {
  try {
    
    if(!isValidEmail(email.email!)) return null;
    
    const updated = await req.app.locals.prisma.email.update({
      where:{email: email.email},
      data:{
        code: email.code,
        sendEmail: email.sendEmail,
        sendEmailAt: email.sendEmailAt,
        codeExpiredAt: email.codeExpiredAt
      }
    })
    return updated;
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function deleteEmail(
  req: Request,
  email: string
) {
  try {
    const entity = await req.app.locals.prisma.email.delete({
      where:{ email : email}
    })
    return entity;
  } catch {
    return null;
  }
}

