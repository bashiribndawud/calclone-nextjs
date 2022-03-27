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

  const { name, email, note, date, guest, id, userId } = req.body;
  console.log(userId)
  if (!name || !email || !note) {
    res.status(422).json({ message: "Please enter all fields" });
  }

  const createRecepient = prisma.reciepient.create({
    data: {
      name: name,
      email: email,
      note: note,
      date: new Date(date),
      guest: guest,
      eventId: parseInt(id),
      userId: 1,
    },
  });

  const updateEvent = prisma.event.update({
    where: {
      id: parseInt(id),
    },
    data: {
      upcoming: true,
    },
  });

  await prisma.$transaction([createRecepient, updateEvent]);
  res.status(200).json({ createRecepient, updateEvent });
}
