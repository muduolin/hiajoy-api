import express, { Request, Response } from "express";
import { User } from "./lib/types";
import {trimEndChar} from './lib/util'

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

export async function updateUser(
  req: Request,
  user: User
) {
  const client = await req.app.locals.pool.connect();
  
  // construct set
  var params ="";
  params +=user.avatar? ` avatar='${user.avatar}', `:"";
  params +=user.password? ` password='${user.password}', `:"";
  params +=user.provider? ` provider='${user.provider}', `:"";
  params +=user.username? ` username='${user.username}', `:"";
  params +=user.expiredAt? ` expiredAt='${user.expiredAt}', `:"";

  params = trimEndChar(params.trimEnd(), ",");
  const query = `Update "user" SET ${params} WHERE id = '${user.id}';`;
  console.log(query)
  const result = await client.query(query);
  console.log(query)
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


export async function getJournal(req: Request, email: string) {
  const client = await req.app.locals.pool.connect();
  console.log(email);
  const query = `SELECT * FROM "user" Where email=\'${email}\'`;
  console.log(query);
  const result = await client.query(query);
  client.release();

  return result.rows ? (result.rows[0] as User) : null;
}
