import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

const getIconSize = (numberOfIcons: number): number => {
  if (numberOfIcons <= 5) {
    return 120;
  } else if (numberOfIcons <= 10) {
    return 90;
  } else if (numberOfIcons <= 15) {
    return 70;
  } else if (numberOfIcons <= 20) {
    return 60;
  } else if (numberOfIcons <= 25) {
    return 50;
  } else if (numberOfIcons <= 35) {
    return 40;
  } else {
    return 30
  }
}

export default function handler(req: NextRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);

    const hasUsername = searchParams.has("username");
    const username = hasUsername
      ? searchParams.get("username")?.slice(0, 100)
      : "Dockhunt";
    const appIcons = searchParams.getAll("icon");
    const avatarUrl = searchParams.get("avatar");

    const iconSize = getIconSize(appIcons.length);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url("${
              process.env.NEXTAUTH_URL as string
            }/og-wallpaper-monterey.jpg")`,
            backgroundSize: "cover",
            width: "1200px",
            height: "630px",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            position: 'relative'
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: '160px',
              marginBottom: "16px",
            }}
          >
            <img src={avatarUrl ?? ''} height={180} width={180} style={{
              borderRadius: '180px'
            }} />
          </div>
          <div
            style={{
              fontSize: 30,
              fontStyle: "normal",
              color: "white",
            }}
          >
            {`@${username}`}
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(75,85,99,.6)",
              backgroundColor: "rgba(31,41,55,.6)",
              borderRadius: "15px",
              marginTop: 'auto',
              marginBottom: '30px'
            }}
          >
            {appIcons.map((icon) => (
              <img key={icon} src={icon} height={iconSize} width={iconSize} />
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
