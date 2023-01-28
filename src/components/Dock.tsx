import { motion } from "framer-motion";
import type { App } from "@prisma/client";
import Link from "next/link";

const DockItem = ({ app }: { app: App }) => {
  const variants = {
    hover: {
      width: 92,
      height: 80,
    },
    initial: {
      width: 80,
      height: 80,
    },
  };

  return (
    <Link href={`/apps/${app.name}`}>
      <motion.div
        variants={variants}
        whileHover="hover"
        initial="initial"
        className="dockItem h-[60px]"
        transition={{
          type: "spring",
          damping: 60,
          stiffness: 500,
          mass: 1,
        }}
      >
        {/* TODO: Switch to next/image once we're storing icons in our own bucket. Might be tricky with framer motion though. */}
        <motion.img
          variants={{
            hover: {
              width: 92,
              height: 92,
              y: -12,
            },
            initial: {
              width: 80,
              height: 80,
            },
          }}
          transition={{
            type: "spring",
            damping: 60,
            stiffness: 500,
            mass: 1,
          }}
          alt={`${app.name} app icon`}
          title={app.name}
          whileHover="hover"
          initial="initial"
          className={"absolute"}
          src={
            app.iconUrl ??
            "https://dockhunt-images.nyc3.cdn.digitaloceanspaces.com/placeholder.png"
          }
        />
      </motion.div>
    </Link>
  );
};

export function Dock({ apps }: { apps: App[] }) {
  return (
    <div className="max-w-full flex-1 overflow-x-auto rounded-[22px] border border-gray-600/60 bg-gray-800/60 backdrop-blur">
      <div className="flex min-w-min">
        {apps.map((app) => (
          <DockItem key={app.name} app={app} />
        ))}
      </div>
    </div>
  );
}
