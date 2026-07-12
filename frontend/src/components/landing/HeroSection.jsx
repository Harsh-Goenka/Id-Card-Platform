import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  ImageIcon,
  Layers3,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function HeroSection() {

  const features = [
    {
      icon: FileSpreadsheet,
      label: "Excel Import",
    },
    {
      icon: ImageIcon,
      label: "Photo Mapping",
    },
    {
      icon: Layers3,
      label: "Visual Editor",
    },
    {
      icon: Download,
      label: "PDF & ZIP",
    },
  ];

  return (

    <section id="home" className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">

        <div
          className="absolute -top-56 -left-52 h-[500px] w-[500px] rounded-full blur-[130px]"
          style={{
            background: "rgba(198,185,167,.18)",
          }}
        />

        <div
          className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{
            background: "rgba(89,99,87,.10)",
          }}
        />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28">

        <div className="grid w-full items-center gap-24 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            {/* Badge */}

            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
              style={{
                background: "rgba(198,185,167,.25)",
                border: "1px solid var(--border)",
                color: "var(--heading)",
              }}
            >

              <CheckCircle2
                size={16}
                color="var(--primary)"
              />

              Professional Bulk ID Card Generation Platform

            </div>

            {/* Heading */}

            <h1
              className="mt-8 text-6xl font-extrabold leading-[1.05] lg:text-7xl"
              style={{
                color: "var(--heading)",
              }}
            >

              Design Once.

              <br />

              Generate

              <span
                style={{
                  color: "var(--primary)",
                }}
              >

                {" "}Thousands

              </span>

              <br />

              of ID Cards.

            </h1>

            {/* Description */}

            <p
              className="mt-8 max-w-xl text-lg leading-9"
              style={{
                color: "var(--text)",
              }}
            >

              Card Engine automates the complete ID card
              generation workflow — import Excel data,
              automatically map photographs, visually design
              layouts, and export thousands of print-ready
              cards within seconds.

            </p>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--primary)",
                  boxShadow: "var(--shadow-md)",
                  color: "white",
                }}
              >

                Login

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/register"
                className="rounded-xl px-8 py-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--heading)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >

                Create Account

              </Link>

            </div>

            {/* Feature Chips */}

            <div className="mt-14 flex flex-wrap gap-4">

              {features.map((feature) => {

                const Icon = feature.icon;

                return (

                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >

                    <Icon
                      size={18}
                      color="var(--primary)"
                    />

                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--heading)",
                      }}
                    >

                      {feature.label}

                    </span>

                  </div>

                );

              })}

            </div>

          </div>

          {/* RIGHT PANEL */}

<div className="relative hidden lg:block">

  {/* Floating Background Card */}

  <div
    className="absolute -left-10 top-10 h-72 w-72 rounded-full blur-[90px]"
    style={{
      background: "rgba(198,185,167,.22)",
    }}
  />

  <div
    className="relative overflow-hidden rounded-[26px]"
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-lg)",
    }}
  >

    {/* Window Header */}

    <div
      className="flex items-center justify-between border-b px-6 py-4"
      style={{
        borderColor: "var(--border)",
      }}
    >

      <div className="flex items-center gap-3">

        <div className="flex gap-2">

          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: "#d4b8b8",
            }}
          />

          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: "#d8c9a8",
            }}
          />

          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: "#9CAF88",
            }}
          />

        </div>

        <span
          className="ml-3 text-sm font-semibold"
          style={{
            color: "var(--muted)",
          }}
        >

          Card Engine

        </span>

      </div>

      <div
        className="rounded-full px-3 py-1 text-xs font-medium"
        style={{
          background: "rgba(89,99,87,.08)",
          color: "var(--primary)",
        }}
      >

        Project

      </div>

    </div>

    {/* Body */}

    <div className="grid grid-cols-[90px_1fr_180px]">

      {/* Sidebar */}

      <div
        className="border-r p-4"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface-2)",
        }}
      >

        {[1,2,3,4,5].map(item=>(

          <div
            key={item}
            className="mb-4 h-12 rounded-xl"
            style={{
              background:"rgba(89,99,87,.08)",
            }}
          />

        ))}

      </div>

      {/* Canvas */}

      <div
        className="relative p-8"
        style={{
          background:"#FDFCFB",
        }}
      >

        <div
          className="mx-auto aspect-[1/1.4] w-[260px] rounded-xl"
          style={{
            background:"white",
            border:"1px solid var(--border)",
            boxShadow:"var(--shadow-md)",
          }}
        >

          {/* Photo */}

          <div
            className="mx-auto mt-7 h-28 w-24 rounded-lg"
            style={{
              background:"rgba(89,99,87,.08)",
            }}
          />

          {/* Text */}

          <div className="mt-7 space-y-3 px-7">

            <div
              className="h-3 rounded"
              style={{
                background:"rgba(89,99,87,.10)",
              }}
            />

            <div
              className="h-3 w-3/4 rounded"
              style={{
                background:"rgba(89,99,87,.10)",
              }}
            />

            <div
              className="h-3 w-2/3 rounded"
              style={{
                background:"rgba(89,99,87,.10)",
              }}
            />

            <div
              className="h-3 w-4/5 rounded"
              style={{
                background:"rgba(89,99,87,.10)",
              }}
            />

          </div>

          {/* Selection */}

          <div
            className="mx-auto mt-8 h-12 w-44 rounded-lg border-2 border-dashed"
            style={{
              borderColor:"var(--primary)",
            }}
          />

        </div>

      </div>

      {/* Properties */}

      <div
        className="border-l p-5"
        style={{
          borderColor:"var(--border)",
          background:"var(--surface-2)",
        }}
      >

        <h3
          className="mb-5 text-sm font-semibold"
          style={{
            color:"var(--heading)",
          }}
        >

          Properties

        </h3>

        {[
          "Binding",
          "Font",
          "Size",
          "Alignment",
          "Color",
          "Weight",
        ].map(label=>(

          <div
            key={label}
            className="mb-4"
          >

            <p
              className="mb-2 text-xs"
              style={{
                color:"var(--muted)",
              }}
            >

              {label}

            </p>

            <div
              className="h-10 rounded-lg"
              style={{
                background:"white",
                border:"1px solid var(--border)",
              }}
            />

          </div>

        ))}

      </div>

    </div>

  </div>

  {/* Floating Cards */}

  <div
    className="absolute -right-6 -top-6 rounded-2xl px-5 py-4"
    style={{
      background:"white",
      border:"1px solid var(--border)",
      boxShadow:"var(--shadow-md)",
    }}
  >

    <p
      className="text-xs"
      style={{
        color:"var(--muted)",
      }}
    >

      Records

    </p>

    <h2
      className="mt-1 text-2xl font-bold"
      style={{
        color:"var(--heading)",
      }}
    >

      1,248

    </h2>

  </div>

  <div
    className="absolute -bottom-7 left-12 rounded-2xl px-5 py-4"
    style={{
      background:"white",
      border:"1px solid var(--border)",
      boxShadow:"var(--shadow-md)",
    }}
  >

    <p
      className="text-xs"
      style={{
        color:"var(--muted)",
      }}
    >

      Status

    </p>

    <div
      className="mt-2 flex items-center gap-2"
    >

      <div
        className="h-2 w-2 rounded-full"
        style={{
          background:"var(--success)",
        }}
      />

      <span
        className="text-sm font-medium"
        style={{
          color:"var(--heading)",
        }}
      >

        Ready to Generate

      </span>

    </div>

  </div>

</div>

        </div>

      </div>

    </section>

  );

}