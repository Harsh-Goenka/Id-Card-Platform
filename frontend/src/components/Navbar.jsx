import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);
    const [activeSection, setActiveSection] =
  useState("home");

  useEffect(() => {

  const sections = [
    "home",
    "features",
    "workflow",
    "performance",
    "cta",
  ];

  const handleScroll = () => {

    setScrolled(window.scrollY > 30);

    let current = "home";

    sections.forEach((id) => {

      const section =
        document.getElementById(id);

      if (!section) return;

      const top =
        section.offsetTop;

      if (
        window.scrollY >= top - 180
      ) {
        current = id;
      }

    });

    setActiveSection(current);

  };

  window.addEventListener(
    "scroll",
    handleScroll
  );

  handleScroll();

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );

}, []);
const navItems = [

  {
    id:"home",
    label:"Home",
  },

  {
    id:"features",
    label:"Features",
  },

  {
    id:"workflow",
    label:"Workflow",
  },

  {
    id:"performance",
    label:"Why Card Engine",
  },

];

const scrollToSection = (id) => {

  const section =
    document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({

    behavior:"smooth",

    block:"start",

  });

  setOpen(false);

};

  return (

    <header className="fixed inset-x-0 top-5 z-50">

      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled
            ? "scale-[0.98]"
            : "scale-100"
        }`}
      >

        <div

          className={`flex items-center justify-between rounded-full px-7 transition-all duration-500 ${
            scrolled
              ? "h-16"
              : "h-20"
          }`}

          style={{

            backdropFilter:
              "blur(22px)",

            WebkitBackdropFilter:
              "blur(22px)",

            background:
              "rgba(255,255,255,.58)",

            border:
              "1px solid rgba(255,255,255,.45)",

            boxShadow:
              "0 12px 40px rgba(38,37,35,.08)",

          }}

        >

          {/* ========================= */}

          {/* LOGO */}

          {/* ========================= */}

          <Link
            to="/"
            className="flex items-center gap-4"
          >

            <div

              className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-extrabold"

              style={{

                background:
                  "var(--primary)",

                color:"white",

              }}

            >

              CE

            </div>

            <div>

              <h2

                className="text-lg font-bold"

                style={{
                  color:"var(--heading)",
                }}

              >

                Card Engine

              </h2>

              <p

                className="text-xs"

                style={{
                  color:"var(--muted)",
                }}

              >

                Professional ID Card Generator

              </p>

            </div>

          </Link>

          {/* ========================= */}

          {/* DESKTOP NAV */}

          {/* ========================= */}

          <nav className="hidden items-center gap-3 lg:flex">

  {navItems.map((item)=>(

    <button

      key={item.id}

      onClick={()=>
        scrollToSection(item.id)
      }

      className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"

      style={{

        background:

          activeSection===item.id

          ? "rgba(89,99,87,.12)"

          : "transparent",

        color:

          activeSection===item.id

          ? "var(--heading)"

          : "var(--muted)",

      }}

    >

      {item.label}

    </button>

  ))}

</nav>

          {/* ========================= */}

          {/* BUTTONS */}

          {/* ========================= */}

          <div className="hidden items-center gap-3 lg:flex">

            <Link

              to="/login"

              className="rounded-full px-6 py-3 font-medium transition"

              style={{

                border:
                  "1px solid var(--border)",

                color:
                  "var(--heading)",

                background:
                  "rgba(255,255,255,.35)",

              }}

            >

              Login

            </Link>

            <Link

              to="/register"

              className="rounded-full px-6 py-3 font-medium text-white transition"

              style={{

                background:
                  "var(--primary)",

                boxShadow:
                  "var(--shadow-md)",
                  color:"white",

              }}

            >

              Register

            </Link>

          </div>

          {/* ========================= */}

          {/* MOBILE */}

          {/* ========================= */}

          <button

            onClick={()=>
              setOpen(!open)
            }

            className="lg:hidden"

          >

            {

              open

              ?

              <X
                size={24}
              />

              :

              <Menu
                size={24}
              />

            }

          </button>

        </div>

      </div>
      {open && (

  <div

    className="mx-auto mt-4 max-w-7xl lg:hidden"

  >

    <div

      className="rounded-3xl p-6"

      style={{

        backdropFilter:"blur(22px)",

        background:"rgba(255,255,255,.72)",

        border:"1px solid rgba(255,255,255,.45)",

        boxShadow:"var(--shadow-lg)",

      }}

    >

      <div className="space-y-3">

        {navItems.map((item)=>(

          <button

            key={item.id}

            onClick={()=>
              scrollToSection(item.id)
            }

            className="w-full rounded-xl px-5 py-4 text-left transition"

            style={{

              background:

                activeSection===item.id

                ? "rgba(89,99,87,.10)"

                : "transparent",

            }}

          >

            {item.label}

          </button>

        ))}

      </div>

      <div className="mt-6 flex gap-3">

        <Link

          to="/login"

          className="flex-1 rounded-xl border py-3 text-center"

          style={{

            borderColor:"var(--border)",

          }}

        >

          Login

        </Link>

        <Link

          to="/register"

          className="flex-1 rounded-xl py-3 text-center text-white"

          style={{

            background:"var(--primary)",

          }}

        >

          Register

        </Link>

      </div>

    </div>

  </div>

)}

    </header>

  );

}