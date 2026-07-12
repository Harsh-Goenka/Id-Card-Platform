import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { register } from "../services/auth.service";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
} from "lucide-react";
export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    confirmPassword: "",

  });

  const [loading, setLoading] =
    useState(false);
const [showPassword, setShowPassword] =
  useState(false);

const [
  showConfirmPassword,
  setShowConfirmPassword,
] = useState(false);
  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }

    setLoading(true);

    try {

      await register({

        name: form.name,

        email: form.email,

        password: form.password,

      });

      toast.success(
  "Account created successfully!"
);

navigate("/login", {
  replace: true,
});

     

    } catch (err) {

      toast.error(
  err.response?.data?.message ||
  "Registration failed"
);

    } finally {

      setLoading(false);

    }

  };

 return (

<div

  className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12"

  style={{
    background:"var(--background)",
  }}

>

  {/* Background */}

  <div

    className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-[110px]"

    style={{
      background:"rgba(198,185,167,.22)",
    }}

  />

  <div

    className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-[120px]"

    style={{
      background:"rgba(89,99,87,.10)",
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

      {/* Left Side */}
      <div className="relative z-10 flex h-full flex-col">

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

    {/* Heading */}

    <h2
      className="mt-8 text-3xl font-bold leading-tight"
      style={{
        color: "var(--heading)",
      }}
    >

      Create Your

      <br />

      Account

    </h2>

    <p
      className="mt-4 max-w-md"
      style={{
        color: "var(--text)",
      }}
    >

      Build your first project,
      design beautiful templates and
      generate thousands of professional
      ID cards effortlessly.

    </p>

  </div>

  {/* Timeline */}

  <div className="relative mt-12">

    {/* Line */}

    <div
      className="absolute left-5 top-7 h-[300px] w-[2px]"
      style={{
        background: "rgba(89,99,87,.15)",
      }}
    />

    {[
      {
        title: "Create Account",
        text: "Get Started",
      },

      {
        title: "Create Project",
        text: "Organize Everything",
      },

      {
        title: "Upload Data",
        text: "Excel • Photos • Template",
      },

      {
        title: "Generate Cards",
        text: "PDF • JPG • ZIP",
      },

    ].map((item,index)=>(

      <motion.div

        key={item.title}

        initial={{
          opacity:0,
          x:-20,
        }}

        animate={{
          opacity:1,
          x:0,
          y:[0,-4,0],
        }}

        transition={{
          opacity:{
            delay:index*.12,
            duration:.5,
          },
          x:{
            delay:index*.12,
            duration:.5,
          },
          y:{
            duration:4,
            repeat:Infinity,
            delay:index*.35,
          },
        }}

        className="relative mb-5 ml-3 flex items-center gap-4"

      >

        {/* Circle */}

        <div

          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full"

          style={{
            background:"white",
            border:"2px solid var(--primary)",
          }}

        >

          <div

            className="h-1.5 w-1.5 rounded-full"

            style={{
              background:"var(--primary)",
            }}

          />

        </div>

        {/* Card */}

        <div

          className="rounded-xl px-5 py-3"

          style={{

            background:"rgba(255,255,255,.72)",

            border:"1px solid rgba(255,255,255,.55)",

            boxShadow:"0 12px 30px rgba(38,37,35,.06)",

          }}

        >

          <h3

            className="font-semibold"

            style={{
              color:"var(--heading)",
            }}

          >

            {item.title}

          </h3>

          <p

            className="mt-1 text-sm"

            style={{
              color:"var(--muted)",
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

      {/* Register Form */}
      <form
  onSubmit={handleSubmit}
  className="mx-auto flex h-full max-w-md flex-col justify-center"
>

  <span
    className="w-fit rounded-full px-4 py-2 text-sm font-medium"
    style={{
      background: "rgba(198,185,167,.18)",
      border: "1px solid var(--border)",
      color: "var(--heading)",
    }}
  >
    Register
  </span>

  <h2
    className="mt-8 text-4xl font-bold"
    style={{
      color: "var(--heading)",
    }}
  >
    Create Your
    <br />
    Account
  </h2>

  <p
    className="mt-5 leading-8"
    style={{
      color: "var(--muted)",
    }}
  >
    Create your account to start building
    professional ID card projects.
  </p>

  {error && (

    <div

      className="mt-8 rounded-2xl px-5 py-4"

      style={{
        background:"#FEF2F2",
        border:"1px solid #FECACA",
        color:"#991B1B",
      }}

    >

      {error}

    </div>

  )}

  {/* Name */}

  <div className="mt-10">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color:"var(--heading)",
      }}
    >
      Full Name
    </label>

    <input

      type="text"

      name="name"

      value={form.name}

      onChange={handleChange}

      required

      placeholder="John Doe"

      className="w-full rounded-2xl px-5 py-4 outline-none transition"

      style={{
        background:"rgba(255,255,255,.65)",
        border:"1px solid var(--border)",
      }}

    />

  </div>

  {/* Email */}

  <div className="mt-6">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color:"var(--heading)",
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

      className="w-full rounded-2xl px-5 py-4 outline-none transition"

      style={{
        background:"rgba(255,255,255,.65)",
        border:"1px solid var(--border)",
      }}

    />

  </div>

  {/* Password */}

  <div className="mt-6">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color:"var(--heading)",
      }}
    >
      Password
    </label>

    <div className="relative">

      <input

        type={
          showPassword
            ? "text"
            : "password"
        }

        name="password"

        value={form.password}

        onChange={handleChange}

        required

        placeholder="••••••••"

        className="w-full rounded-2xl px-5 py-4 pr-14 outline-none transition"

        style={{
          background:"rgba(255,255,255,.65)",
          border:"1px solid var(--border)",
        }}

      />

      <button

        type="button"

        onClick={()=>
          setShowPassword(
            !showPassword
          )
        }

        className="absolute right-5 top-1/2 -translate-y-1/2"

        style={{
          color:"var(--muted)",
        }}

      >

        {

          showPassword

          ?

          <EyeOff size={20}/>

          :

          <Eye size={20}/>

        }

      </button>

    </div>

  </div>

  {/* Confirm Password */}

  <div className="mt-6">

    <label
      className="mb-2 block text-sm font-medium"
      style={{
        color:"var(--heading)",
      }}
    >
      Confirm Password
    </label>

    <div className="relative">

      <input

        type={
          showConfirmPassword
            ? "text"
            : "password"
        }

        name="confirmPassword"

        value={form.confirmPassword}

        onChange={handleChange}

        required

        placeholder="••••••••"

        className="w-full rounded-2xl px-5 py-4 pr-14 outline-none transition"

        style={{
          background:"rgba(255,255,255,.65)",
          border:"1px solid var(--border)",
        }}

      />

      <button

        type="button"

        onClick={()=>

          setShowConfirmPassword(

            !showConfirmPassword

          )

        }

        className="absolute right-5 top-1/2 -translate-y-1/2"

        style={{
          color:"var(--muted)",
        }}

      >

        {

          showConfirmPassword

          ?

          <EyeOff size={20}/>

          :

          <Eye size={20}/>

        }

      </button>

    </div>

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

    className="mt-10 rounded-2xl py-4 font-medium text-white"

    style={{
      background:"var(--primary)",
      boxShadow:"var(--shadow-md)",
    }}

  >

    {

      loading

      ?

      "Creating Account..."

      :

      "Create Account"

    }

  </motion.button>

  <div

    className="mt-8 text-center"

    style={{
      color:"var(--muted)",
    }}

  >

    Already have an account?

    {" "}

    <Link

      to="/login"

      className="font-semibold"

      style={{
        color:"var(--primary)",
      }}

    >

      Sign In

    </Link>

  </div>

</form>

    </div>

  </motion.div>

</div>

);

}