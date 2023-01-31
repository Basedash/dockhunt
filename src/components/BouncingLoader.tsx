import Image from "next/image";
import { motion } from "framer-motion";

const NextImage = motion(Image);

export const BouncingLoader = () => {
  return (
    <div className={'flex justify-center items-center flex-col'}>
      <NextImage
        src={"/dockhunt-icon.png"}
        width={100}
        height={100}
        alt={"Dockhunt logo bouncing"}
        animate={{ y: [0, -40] }}
        transition={{
          y: {
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeOut"
          },}
        }
      />
    </div>
  );
}
