import { motion } from "framer-motion";
import type { App } from "@prisma/client";

const DockItem = ({ app }: { app: App }) => {
  const variants = {
    hover: {
      width: 68,
      height: 52
    },
    initial: {
      width: 52,
      height: 52
    }
  };

  return (
    <motion.div
      // href={`/apps/${dockItem.app.name}`}
      variants={variants}
      whileHover="hover"
      initial="initial"
      className="dockItem h-[60px] h-[60px]"
      transition={{
        type: "spring",
        damping: 60,
        stiffness: 500,
        mass: 1
      }}
    >
      {/* TODO: Switch to next/image once we're storing icons in our own bucket. Might be tricky with framer motion though. */}
      <motion.img
        variants={{
          hover: {
            width: 68,
            height: 68,
            y: -12
          },
          initial: {
            width: 52,
            height: 52
          }
        }}
        transition={{
          type: "spring",
          damping: 60,
          stiffness: 500,
          mass: 1
        }}
        alt={`${app.name} app icon`}
        title={app.name}
        whileHover="hover"
        initial="initial"
        className={'absolute'}
        src={app.iconUrl ?? "https://www.pngkit.com/png/detail/103-1038731_ios-icon-icons-png-free-and-downloads-ios.png"}
      />
    </motion.div>
  );
};

export function Dock({apps}: {apps: App[]}) {
  return (
    <>
      <div className="flex flex-col bg-[rgba(0, 0, 0, 0.3)] border rounded-[15px] border-white">
        <div className="flex">
          {apps.map((app) => (<DockItem
            key={app.name}
            app={app}
          />))}
        </div>
      </div>
    </>
  );
}
