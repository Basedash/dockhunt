import Head from "next/head";

const AddDock = () => {
  return (
    <>
      <Head>
        <title>Add your dock | Dockhunt</title>
        <meta name="description" content="Add your dock" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen flex-col items-start justify-center px-4">
        <p className={"mb-8 text-xl"}>
          To add your own dock, run the following command in your terminal:
        </p>
        <code className="mb-8 w-full rounded border bg-black p-4">
          npx dockhunt
        </code>
        <p className={"mb-8 text-xl"}>
          The command will:
          <ol className="mt-2 list-decimal pl-8">
            <li>Find the apps in your dock</li>
            <li>Upload any icons not yet in our database</li>
            <li>Create a dock on this website</li>
          </ol>
        </p>
        <a
          href="https://github.com/Basedash/dockhunt"
          target="_blank"
          rel="noreferrer"
          className="text-xl hover:underline"
        >
          View source code on GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/dockhunt"
          target="_blank"
          rel="noreferrer"
          className="text-xl hover:underline"
        >
          View package on npm
        </a>
      </div>
    </>
  );
};

export default AddDock;
