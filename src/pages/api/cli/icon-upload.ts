/* Route to upload app icons (if the app doesn't already have an icon in our database)
 * If an icon is found in the DB for the given app name, we will ignore the image in the request.
 *
 * Note that this route also works for just saving an app with no icon in the db. We should probably rename it.
 **/

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

import aws from "aws-sdk";
import { v4 as uuid } from "uuid";
import fs from "fs";
import formidable from "formidable";
import { env } from "env/server.mjs";

const s3 = new aws.S3({
  endpoint: env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export const uploadFile = async ({
  file,
  bucketName,
}: {
  file: formidable.File;
  bucketName: string;
}) => {
  const fileStream = fs.readFileSync(file.filepath);

  const key = uuid();

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: key,
    ACL: "public-read",
  };

  return s3.upload(uploadParams).promise();
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.log('err', err);
        return res.status(400).json({ message: "Error parsing form" });
      } else {
        const appName = fields.app;
        if (!appName) {
          return res.status(400).json({ error: "App name not provided" });
        }
        if (Array.isArray(appName)) {
          return res.status(400).json({ error: "Cannot provide multipe app names" });
        }
        const existingApp = await prisma.app.findUnique({
          where: {
            name: appName,
          },
        });
        if (existingApp && existingApp.iconUrl) {
          return res.status(400).json({ message: "App already has an icon" });
        }
        const file = files.icon;
        if (!file) {
          console.warn("No icon file found for app: ", appName);
        }

        let uploadedFile: aws.S3.ManagedUpload.SendData | undefined;

        if (file) {
          if (Array.isArray(file)) {
            return res.status(400).json({ error: "Only 1 file permitted" });
          }
          if (file.size > 1 * 1024 * 1024) {
            // Make sure file is less than 1MB
            return res.status(400).json({ error: "File is too large" });
          }
          uploadedFile = await uploadFile({
            file,
            bucketName: "dockhunt-images",
          });
        }


        const app = await prisma.app.upsert({
          where: {
            name: appName,
          },
          create: {
            name: appName,
            iconUrl: uploadedFile ? `https://dockhunt-images.nyc3.cdn.digitaloceanspaces.com/${uploadedFile.Key}` : null,
          },
          update: {
            // Important to use `undefined` and not `null` here to avoid overwriting existing icon if the user calls this endpoint with no icon,
            // but there is already an icon in the DB
            iconUrl: uploadedFile ? `https://dockhunt-images.nyc3.cdn.digitaloceanspaces.com/${uploadedFile.Key}` : undefined,
          },
        });

        return res.status(201).json({ app });
      }
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
