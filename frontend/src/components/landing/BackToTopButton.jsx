import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTopButton() {

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setVisible(
        window.scrollY > 350
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  const scrollTop = () => {

    window.scrollTo({

      top:0,

      behavior:"smooth",

    });

  };

  return (

    <AnimatePresence>

      {visible && (

        <motion.button

          initial={{
            opacity:0,
            scale:.8,
            y:20,
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0,
          }}

          exit={{
            opacity:0,
            scale:.8,
            y:20,
          }}

          transition={{
            duration:.25,
          }}

          whileHover={{
            scale:1.08,
            y:-3,
          }}

          whileTap={{
            scale:.95,
          }}

          onClick={scrollTop}

          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full"

          style={{

            backdropFilter:
              "blur(20px)",

            WebkitBackdropFilter:
              "blur(20px)",

            background:
              "rgba(255,255,255,.62)",

            border:
              "1px solid rgba(255,255,255,.45)",

            boxShadow:
              "0 15px 35px rgba(38,37,35,.12)",

          }}

        >

          <ChevronUp

            size={22}

            color="var(--primary)"

          />

        </motion.button>

      )}

    </AnimatePresence>

  );

}