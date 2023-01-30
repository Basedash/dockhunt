import * as Tooltip from "@radix-ui/react-tooltip";
import type { inferRouterOutputs } from "@trpc/server";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import type { AppRouter } from "server/api/root";

import { Dock as DockComponent } from "./Dock";

export function DockCard({
  dock,
}: {
  dock: inferRouterOutputs<AppRouter>["docks"]["getFeatured"][0];
}) {
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-sm text-gray-500">
        <a
          className="hover:underline"
          href={`https://twitter.com/${dock.user.username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{dock.user.username}
        </a>{" "}
        &sdot; {format(dock.createdAt, "MMM d, y")}
      </p>

      <div className="relative flex justify-center gap-12">
        <Tooltip.Root>
          <Tooltip.Trigger className="absolute top-4 z-10 text-gray-600 md:top-1/2 md:left-0 md:-translate-x-1/2 md:-translate-y-1/2">
            <Link href={`/users/${dock.user.username}`}>
              {/* TODO: Use placeholder image for null values */}
              <Image
                src={dock.user.avatarUrl ?? ""}
                alt={`${dock.user.name}'s avatar`}
                width={80}
                height={80}
                className="rounded-full border border-solid border-gray-600/60"
              />
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content sideOffset={10} className="z-20">
              <div className="rounded-[4px] border border-[#49494B] bg-[#272728] py-[4px] px-[10px] text-xs text-white">
                {dock.user.name}
              </div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Link
          className={`h-52 w-full rounded-[36px] border border-solid border-gray-600/60 bg-monterey bg-cover bg-center opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100 md:h-64`}
          href={`/users/${dock.user.username}`}
        />

        <div className="absolute bottom-4 max-w-full px-4 md:px-12">
          <DockComponent
            apps={dock.dockItems.map((dockItem) => dockItem.app)}
          />
        </div>
      </div>
    </div>
  );
}
