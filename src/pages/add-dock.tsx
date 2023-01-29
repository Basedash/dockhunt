import Head from "next/head";
import pinnedDocks from "images/pinned.jpg";
import Image from "next/image";

const AddDock = () => {
  return (
    <>
      <Head>
        <title>Add your dock | Dockhunt</title>
        <meta name="description" content="Add your dock" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen max-w-[800px] flex-col items-start justify-center px-8 py-24">
        <h3 className="mb-2 text-xl">Prerequisites</h3>
        <ul className="mb-8 list-disc pl-8 text-xl">
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
          <li>You will be asked to authenticate with Twitter</li>
        </ul>
        <p className="mb-8 text-xl">
          To add your own dock, run the following command in your terminal:
        </p>
        <code className="mb-8 w-full rounded border bg-black p-4">
          npx dockhunt
        </code>
        <p className="mb-2 text-xl">The command will:</p>
        <ol className="mb-8 list-decimal pl-8 text-xl">
          <li>Find the apps in your dock</li>
          <li>Upload any icons not yet in our database</li>
          <li>Create a dock on this website</li>
        </ol>

        <div className="mb-8 flex flex-col items-start text-xl">
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
