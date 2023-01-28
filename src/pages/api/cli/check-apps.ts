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
      }
    });
    const appToAppname = new Map(correspondingAppsFromDatabase.map(app => [app.name, app]));

    const missingAppsInformation: {name: string; foundInDb: boolean; missingAppIcon: boolean;}[] = [];

    for (const appName of arrayOfAppNames) {
      const appFromDatabase = appToAppname.get(appName);
      if (appFromDatabase && !appFromDatabase.iconUrl) {
        missingAppsInformation.push({
          name: appName,
          foundInDb: true,
          missingAppIcon: true,
        });
      } else if (!appFromDatabase) {
        missingAppsInformation.push({
          name: appName,
          foundInDb: false,
          missingAppIcon: true,
        });
      }
    }
    return res.json({missingAppsInformation})
  } else {
    return res.status(405).json({ message: "Method not allowed" });

  }
}
