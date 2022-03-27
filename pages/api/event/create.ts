import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }
  console.log(req.body);
  // get data from request
  const { title, url, description, length, userId, email, username } = req.body;

  if (!title || !description || !length) {
    res.status(422).json({ message: "Please provide all data" });
  }

  const createdEvent = await prisma.event.create({
    data: {
      title: title,
      url: url,
      description: description,
      length: parseInt(length),
      userId: userId,
      username: username,
      email: email,
    },
  });

  res.status(200).json(createdEvent);
}
