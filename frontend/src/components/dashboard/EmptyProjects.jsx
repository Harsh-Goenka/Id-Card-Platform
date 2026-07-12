import { motion } from "framer-motion";
import {
  FolderOpen,
  Sparkles,
} from "lucide-react";

export default function EmptyProjects() {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:25,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:.5,
      }}

      className="relative overflow-hidden rounded-[30px] p-14 text-center"

      style={{

        background:"var(--surface)",

        border:"1px solid var(--border)",

        boxShadow:"var(--shadow-sm)",

      }}

    >

      {/* Background Decoration */}

      <div

        className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"

        style={{
          background:"rgba(198,185,167,.18)",
        }}

      />

      <div

        className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full blur-3xl"

        style={{
          background:"rgba(89,99,87,.08)",
        }}

      />

      {/* Illustration */}

      <motion.div

        animate={{
          y:[0,-6,0],
        }}

        transition={{
          duration:4,
          repeat:Infinity,
        }}

        className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[28px]"

        style={{

          background:"rgba(89,99,87,.10)",

        }}

      >

        <FolderOpen

          size={44}

          color="var(--primary)"

        />

      </motion.div>

      {/* Badge */}

      <div

        className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full px-4 py-2"

        style={{

          background:"rgba(198,185,167,.16)",

          border:"1px solid var(--border)",

        }}

      >

        <Sparkles

          size={16}

          color="var(--primary)"

        />

        <span

          className="text-sm font-medium"

          style={{
            color:"var(--heading)",
          }}

        >

          Ready to Begin

        </span>

      </div>

      {/* Heading */}

      <h2

        className="mt-8 text-3xl font-bold"

        style={{
          color:"var(--heading)",
        }}

      >

        No Projects Yet

      </h2>

      {/* Text */}

      <p

        className="mx-auto mt-5 max-w-lg text-lg leading-8"

        style={{
          color:"var(--muted)",
        }}

      >

        Create your first project to start designing,
        generating and exporting professional
        ID cards.

      </p>

    </motion.div>

  );

}