import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginService(form);
      login(response.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

<div
  className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12"
  style={{
    background: "var(--background)",
  }}
>

  {/* Background Blob */}

  <div
    className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-[110px]"
    style={{
      background: "rgba(198,185,167,.22)",
    }}
  />

  <div
    className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-[120px]"
    style={{
      background: "rgba(89,99,87,.10)",
    }}
  />

  {/* Glass Card */}

  <motion.div

    initial={{
      opacity:0,
      y:30,
    }}

    animate={{
      opacity:1,
      y:0,
    }}

    transition={{
      duration:.7,
    }}

    className="relative grid w-full max-w-6xl overflow-hidden rounded-[36px] lg:grid-cols-2"

    style={{

      background:"rgba(255,255,255,.62)",

      backdropFilter:"blur(26px)",

      WebkitBackdropFilter:"blur(26px)",

      border:"1px solid rgba(255,255,255,.45)",

      boxShadow:"0 25px 80px rgba(38,37,35,.10)",

    }}

  >

    {/* LEFT */}

    <div

      className="relative hidden overflow-hidden p-14 lg:block"

      style={{

        background:
        "linear-gradient(180deg,#FCFBF9,#F5F2EE)",

      }}

    >

      {/* Left content comes next */}
      <div className="relative z-10 flex h-full flex-col justify-between">

  {/* Logo */}

  <div>

    <div className="flex items-center gap-4">

      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold"
        style={{
          background: "var(--primary)",
          color: "white",
        }}
      >
        CE
      </div>

      <div>

        <h1
          className="text-3xl font-bold"
          style={{
            color: "var(--heading)",
          }}
        >
          Card Engine
        </h1>

        <p
          className="mt-1"
          style={{
            color: "var(--muted)",
          }}
        >
          Professional ID Card Generation
        </p>

      </div>

    </div>

    <h2
      className="mt-8 text-3xl font-bold leading-tight"
      style={{
        color: "var(--heading)",
      }}
    >
      Welcome
      
      Back.
    </h2>

    <p
      className="mt-4 max-w-md text-md"
      style={{
        color: "var(--text)",
      }}
    >
      Continue managing projects, designing templates
      and generating professional ID cards in minutes.
    </p>

  </div>

  {/* Workflow */}

  <div className="relative mt-8">

    <div
      className="absolute left-5 top-7 h-[300px] w-[2px]"
      style={{
        background: "rgba(89,99,87,.15)",
      }}
    />

    {[
      {
        title: "Import Data",
        text: "Photos • Excel • Template",
      },
      
      {
        title: "Design Layout",
        text: "Visual Editor",
      },
      {
        title: "Generate",
        text: "Multi-threaded",
      },
      {
        title: "Export",
        text: "PDF • JPG • ZIP",
      },
    ].map((item, index) => (

      <motion.div

        key={item.title}

        initial={{
          opacity: 0,
          x: -20,
        }}

        animate={{
          opacity: 1,
          x: 0,
          y: [0, -4, 0],
        }}

        transition={{
          opacity: {
            delay: index * .12,
            duration: .5,
          },
          x: {
            delay: index * .12,
            duration: .5,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            delay: index * .3,
          },
        }}

        className="relative mb-5 ml-3 flex items-center gap-4"

      >

        {/* Circle */}

        <div

          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full"

          style={{
            background: "white",
            border: "2px solid var(--primary)",
          }}

        >

          <div

            className="h-1.5 w-1.5 rounded-full"

            style={{
              background: "var(--primary)",
            }}

          />

        </div>

        {/* Card */}

        <div

          className="rounded-xl px-5 py-3"

          style={{
            background: "rgba(255,255,255,.70)",
            border: "1px solid rgba(255,255,255,.55)",
            boxShadow: "0 12px 30px rgba(38,37,35,.06)",
          }}

        >

          <h3

            className="font-semibold"

            style={{
              color: "var(--heading)",
            }}

          >

            {item.title}

          </h3>

          <p

            className="mt-1 text-sm"

            style={{
              color: "var(--muted)",
            }}

          >

            {item.text}

          </p>

        </div>

      </motion.div>

    ))}

  </div>

</div>

    </div>

    {/* RIGHT */}

    <div className="p-12 lg:p-16">

      {/* Right form comes next */}
      <form
  onSubmit={handleSubmit}
  className="mx-auto flex h-full max-w-md flex-col justify-center"
>

  <span
    className="rounded-full px-4 py-2 text-sm font-medium w-fit"
    style={{
      background: "rgba(198,185,167,.18)",
      border: "1px solid var(--border)",
      color: "var(--heading)",
    }}
  >
    Login
  </span>

  <h2
    className="mt-8 text-4xl font-bold"
    style={{
      color: "var(--heading)",
    }}
  >
    Sign in to
    <br />
    Card Engine
  </h2>

  <p
    className="mt-5 leading-8"
    style={{
      color: "var(--muted)",
    }}
  >
    Enter your credentials to continue managing
    projects and generating ID cards.
  </p>

  {error && (

    <div
      className="mt-8 rounded-2xl px-5 py-4"
      style={{
        background: "#FEF2F2",
        border: "1px solid #FECACA",
        color: "#991B1B",
      }}
    >
      {error}
    </div>

  )}

  {/* Email */}

  <div className="mt-10">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color: "var(--heading)",
      }}
    >
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      required
      placeholder="john@example.com"
      className="w-full rounded-2xl px-5 py-4 outline-none transition-all duration-300"
      style={{
        background: "rgba(255,255,255,.65)",
        border: "1px solid var(--border)",
      }}
      onFocus={(e)=>{
        e.target.style.borderColor="var(--primary)";
      }}
      onBlur={(e)=>{
        e.target.style.borderColor="var(--border)";
      }}
    />

  </div>

  {/* Password */}

  <div className="mt-7">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color: "var(--heading)",
      }}
    >
      Password
    </label>

    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      required
      placeholder="••••••••"
      className="w-full rounded-2xl px-5 py-4 outline-none transition-all duration-300"
      style={{
        background: "rgba(255,255,255,.65)",
        border: "1px solid var(--border)",
      }}
      onFocus={(e)=>{
        e.target.style.borderColor="var(--primary)";
      }}
      onBlur={(e)=>{
        e.target.style.borderColor="var(--border)";
      }}
    />

  </div>

  {/* Button */}

  <motion.button

    whileHover={{
      y:-2,
      scale:1.01,
    }}

    whileTap={{
      scale:.98,
    }}

    disabled={loading}

    type="submit"

    className="mt-10 rounded-2xl py-4 text-white font-medium"

    style={{
      background:"var(--primary)",
      boxShadow:"var(--shadow-md)",
    }}

  >

    {

      loading

      ?

      "Signing In..."

      :

      "Login"

    }

  </motion.button>

  {/* Bottom */}

  <div
    className="mt-8 text-center"
    style={{
      color:"var(--muted)",
    }}
  >

    Don't have an account?

    {" "}

    <Link

      to="/register"

      className="font-semibold"

      style={{
        color:"var(--primary)",
      }}

    >

      Create one

    </Link>

  </div>

</form>

    </div>

  </motion.div>

</div>

);
}