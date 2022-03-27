import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hashPassword } from "../../../libs/auth";
import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }
  const { username, email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7 ||
    !username
  ) {
    res.status(422).json({
      message: "Please provide all input - Password greater than 7",
    });
    return;
  }

  // Check for an existing user in the database
  const userExist = await prisma.user.findFirst({
    where: {
      email: "umar@gmail.com",
    },
  });
  if (userExist) {
    res.status(422).json({ mesage: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });

  res.json(createdUser);
}
