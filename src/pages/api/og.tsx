import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { NextApiResponse } from "next";
export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);

    const hasUsername = searchParams.has('username');
    const username = hasUsername
      ? searchParams.get('username')?.slice(0, 100)
      : 'Dockhunt';

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 100,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '50px 200px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          👋, 🌎
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
        // Default to 'twemoji'
        emoji: 'twemoji',
      },
    );

    // return new ImageResponse(
    //   (
    //     <div
    //       style={{
    //         // backgroundImage: `url("${process.env.NEXTAUTH_URL as string}/og-wallpaper.jpg")`,
    //         backgroundSize: 'cover',
    //         width: '1200px',
    //         height: '630px',
    //         display: 'flex',
    //         textAlign: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         flexDirection: 'column',
    //         flexWrap: 'nowrap',
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           justifyItems: 'center',
    //           marginBottom: '16px'
    //         }}
    //       >
    //         {/*<img src={`${process.env.NEXTAUTH_URL as string}/og-dockhunt.png`} height={126} width={126} />*/}
    //       </div>
    //       <div
    //         style={{
    //           fontSize: 52,
    //           fontStyle: 'normal',
    //           letterSpacing: '-0.025em',
    //           color: 'white',
    //           marginTop: 30,
    //           padding: '0 60px',
    //           lineHeight: 1.4,
    //           whiteSpace: 'pre-wrap',
    //           border: '1px solid rgba(75,85,99,.6)',
    //           backgroundColor: 'rgba(31,41,55,.6)',
    //           borderRadius: '15px',
    //         }}
    //       >
    //         {`Checkout ${username}'s dock`}
    //       </div>
    //     </div>
    //   ),
    //   {
    //     width: 1200,
    //     height: 630,
    //   },
    // );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
