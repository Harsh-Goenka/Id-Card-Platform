import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {

  return (

    <section  id="cta" className="py-28">

      <motion.div

        initial={{
          opacity:0,
          y:50,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:false,
          amount:.3,
        }}

        transition={{
          duration:.7,
        }}

        className="mx-auto max-w-5xl rounded-[32px] px-12 py-20 text-center"

        style={{
          background:"var(--surface)",
          border:"1px solid var(--border)",
          boxShadow:"var(--shadow-lg)",
        }}

      >

        <span

          className="rounded-full px-4 py-2 text-sm font-medium"

          style={{
            background:"rgba(198,185,167,.18)",
            border:"1px solid var(--border)",
            color:"var(--heading)",
          }}

        >

          Ready to Begin?

        </span>

        <h2

          className="mt-8 text-5xl font-bold"

          style={{
            color:"var(--heading)",
          }}

        >

          Start Designing

          <br/>

          Your Next ID Card Project

        </h2>

        <p

          className="mx-auto mt-7 max-w-2xl text-lg leading-9"

          style={{
            color:"var(--text)",
          }}

        >

          Create a project, upload your data and generate
          professional ID cards within minutes.

        </p>

        <div className="mt-12 flex justify-center gap-5">

          <Link

            to="/login"

            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1"

            style={{
              background:"var(--primary)",
              boxShadow:"var(--shadow-md)",
              color:"white",
            }}

          >

            Login

            <ArrowRight size={18}/>

          </Link>

          <Link

            to="/register"

            className="rounded-xl px-8 py-4 transition-all duration-300 hover:-translate-y-1"

            style={{
              background:"white",
              border:"1px solid var(--border)",
              color:"var(--heading)",
            }}

          >

            Create Account

          </Link>

        </div>

      </motion.div>

    </section>

  );

}