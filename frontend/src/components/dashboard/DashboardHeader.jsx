import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHeader() {

  const { user, signOut } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <header className="sticky top-0 z-40">

      <div className="mx-auto max-w-7xl px-6 pt-6">

        <motion.div

          initial={{
            opacity:0,
            y:-20,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:.5,
          }}

          className="flex items-center justify-between rounded-[28px] px-8 py-6"

          style={{

            background:"rgba(255,255,255,.70)",

            backdropFilter:"blur(22px)",

            WebkitBackdropFilter:"blur(22px)",

            border:"1px solid rgba(255,255,255,.55)",

            boxShadow:"var(--shadow-md)",

          }}

        >

          {/* LEFT */}

          <div className="flex items-center gap-5">

            <div

              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold"

              style={{

                background:"var(--primary)",

                color:"white",

              }}

            >

              CE

            </div>

            <div>

              <p

                className="text-sm"

                style={{
                  color:"var(--muted)",
                }}

              >

                {greeting}

              </p>

              <h1

                className="text-2xl font-bold"

                style={{
                  color:"var(--heading)",
                }}

              >

                {user?.name} <span className="text-lg">👋</span>

              </h1>

            </div>

          </div>

          {/* RIGHT */}

          <button

            onClick={signOut}

            className="flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"

            style={{

              background:"white",

              border:"1px solid var(--border)",

              color:"var(--heading)",

            }}

          >

            <LogOut size={18}/>

            Logout

          </button>

        </motion.div>

      </div>

    </header>

  );

}