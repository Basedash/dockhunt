import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

// Endpoint that checks if the provided apps have images already specified in the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { app } = req.query;

    if (!app) {
      return res.status(400).json({ message: "Missing apps" });
    }
    const arrayOfAppNames = Array.isArray(app) ? app : [app];

    const correspondingAppsFromDatabase = await prisma.app.findMany({
      where: {
        name: {
          in: arrayOfAppNames
        },
        iconUrl: {
          not: null
        }
      }
    });
    const appsWithImages = new Set(correspondingAppsFromDatabase.map(app => app.name));
    const appsMissingIcon = [];
    for (const appName of arrayOfAppNames) {
      if (!appsWithImages.has(appName)) {
        appsMissingIcon.push(appName);
      }
    }
    return res.json({appsMissingIcon})
  } else {
    return res.status(405).json({ message: "Method not allowed" });

  }
}
