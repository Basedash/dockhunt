import { motion } from "framer-motion";
import type { App } from "@prisma/client";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { placeholderImageUrl } from "utils/constants";
import Image from "next/image";
import * as ScrollArea from '@radix-ui/react-scroll-area';

const DockImage = motion(Image);

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
    <Tooltip.Root>
      <Tooltip.Trigger>
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
            <DockImage
              height={92}
              width={92}
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
              whileHover="hover"
              initial="initial"
              className={"absolute"}
              src={app.iconUrl ?? placeholderImageUrl}
            />
          </motion.div>
        </Link>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={10} className="z-20">
          <div
            className={
              "rounded-[4px] border border-[#49494B] bg-[#272728] py-[4px] px-[10px] text-xs text-white"
            }
          >
            {app.name}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export function Dock({ apps }: { apps: App[] }) {
  return (
    <div className="relative">
      {/* Dock background */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] max-w-full rounded-[22px] border border-gray-600/60 bg-gray-800/60" />
      {/* Scrollable container */}
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <div className="fade-lr relative flex max-w-full flex-1 overflow-x-auto pt-4">
            {apps.map((app) => (
              <DockItem key={app.name} app={app} />
            ))}
          </div>
        </ScrollArea.Viewport>
        {/* TODO: Style the scrollbar: https://www.radix-ui.com/docs/primitives/components/scroll-area */}
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
}
