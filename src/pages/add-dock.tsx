import Head from "next/head";
import pinnedDocks from "images/pinned.jpg";
import Image from "next/image";
import Link from "next/link";
import { desktopAppDownloadLink } from "utils/constants";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";

const AddDock = () => {
  const { data: sessionData } = useSession();
  const user = api.users.getOne.useQuery({ id: sessionData?.user?.id ?? "" });

  const copyCommandToClipboard = () => {
    navigator.clipboard.writeText('npx dockhunt').then(() => {
      alert('Command copied to clipboard!');
    }, (err) => {
      console.error('Could not copy command: ', err);
    });
  };

  return (
    <>
      <Head>
        <title>Dockhunt | Add your dock</title>
        <meta name="description" content="Add your dock" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen max-w-[800px] flex-col items-start justify-center px-8 py-24">
        <h1 className="mb-8 text-3xl font-semibold">
          {!user.data?.dock ? "Add your own dock" : "Update your dock"}
        </h1>
        <h2 className={"mb-4 text-2xl"}>Desktop app method (preferred)</h2>
        <h3 className="mb-2 text-xl">Prerequisites</h3>
        <ul className="mb-8 list-disc pl-8 text-xl">
          <li>macOS 11+ (Big Sur and above)</li>
        </ul>

        <p className="mb-4 text-xl">
          Download the desktop app, unzip it, and move the app into your
          applications directory. Once in your applications directory you will
          be able to run the app.
        </p>

        <a
          className="mb-8 rounded-full bg-blue-700 px-4 py-2 hover:bg-blue-600"
          download
          href={desktopAppDownloadLink}
        >
          Download desktop app
        </a>

        <h2 className={"mb-4 text-2xl"}>CLI method</h2>
        <h3 className="mb-2 text-xl">Prerequisites</h3>
        <ul className="mb-8 list-disc pl-8 text-xl">
          <li>macOS 11+ (Big Sur and above)</li>
          <li>
            You must have{" "}
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Node.js
            </a>{" "}
            installed on your computer
          </li>
        </ul>
        <p className="mb-8 text-xl">
          To add your own dock, run the following command in your{" "}
          <Link href="/apps/Terminal">terminal</Link>:
        </p>
        <div className="flex items-center mb-8">
          <code className="rounded border bg-black p-4 mr-4">
            npx dockhunt
          </code>
          <button
            className="rounded-full bg-blue-700 px-4 py-2 hover:bg-blue-600 text-white"
            onClick={copyCommandToClipboard}
          >
            Copy
          </button>
        </div>
        <p className="mb-2 text-xl">The command will:</p>
        <ol className="mb-8 list-decimal pl-8 text-xl">
          <li>Find the apps in your dock</li>
          <li>Upload any icons not yet in our database</li>
          <li>Create a dock on this website</li>
        </ol>

        <div className="mb-4 flex flex-col items-start text-xl">
          <a
            href="https://github.com/Basedash/dockhunt-cli"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            View source code on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/dockhunt"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            View package on npm
          </a>
        </div>

        <hr className={"my-8 w-full"} />

        <p className="mb-8 text-xl">
          Dockhunt will only use the apps that are pinned to your dock. Apps can
          be pinned by right-clicking and selecting Options &gt; Keep in Dock.
          Apps that are not pinned will be ignored.
        </p>
        <Image
          className="mb-8"
          src={pinnedDocks}
          alt="Pinned vs recent dock items"
        />
      </div>
    </>
  );
};

export default AddDock;
