import { motion } from "framer-motion";

// .dockWrapper {
//   background: rgba(0, 0, 0, 0.3);
//   display: flex;
//   border-radius: 15px;
// }
//
// .dockItem img {
//   position: absolute;
// }

const DockItem = ({ imgUrl }: { imgUrl: string }) => {
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
        whileHover="hover"
        initial="initial"
        src={imgUrl}
      />
    </motion.div>
  );
};

export default function Dock() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <DockItem
            imgUrl={
              "https://framerusercontent.com/images/BlM83ttV352m9OYNO6L6O673EM.png"
            }
          />
          <DockItem
            imgUrl={
              "https://framerusercontent.com/images/3NeRl8GGzIb7qC2keBcx7u1kk.png"
            }
          />
          <DockItem
            imgUrl={
              "https://framerusercontent.com/images/yuLavRmYDK2h6MHnOY1Pgjn8cc.png"
            }
          />
          <DockItem
            imgUrl={
              "https://framerusercontent.com/images/N0ZpXxdw6YgnX4Y1db8EvAZEo.png"
            }
          />
        </div>
      </div>
    </>
  );
}
