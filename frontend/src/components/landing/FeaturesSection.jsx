import {
  FileSpreadsheet,
  ImageIcon,
  PenTool,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  Archive,
} from "lucide-react";

export default function FeaturesSection() {

  return (

    <section
      id="features"
      className="relative py-26"
    >

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span
            className="rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background:"rgba(198,185,167,.22)",
              border:"1px solid var(--border)",
              color:"var(--heading)",
            }}
          >

            Everything You Need

          </span>

          <h2
            className="mt-8 text-5xl font-bold leading-tight"
            style={{
              color:"var(--heading)",
            }}
          >

            Built for Modern

            <br />

            Card Production

          </h2>

          <p
            className="mx-auto mt-8 max-w-2xl text-lg leading-9"
            style={{
              color:"var(--text)",
            }}
          >

            Card Engine combines spreadsheet automation,
            intelligent photo mapping and a professional
            visual editor into one streamlined workflow.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-24 grid gap-8 lg:grid-cols-2">

          {/* ================================================= */}

          {/* Excel */}

          {/* ================================================= */}

          <div
            className="overflow-hidden rounded-[26px] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background:"var(--surface)",
              border:"1px solid var(--border)",
              boxShadow:"var(--shadow-md)",
            }}
          >

            <div className="flex items-center justify-between">

              <div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background:"rgba(89,99,87,.08)",
                  }}
                >

                  <FileSpreadsheet
                    size={28}
                    color="var(--primary)"
                  />

                </div>

                <h3
                  className="mt-6 text-2xl font-semibold"
                  style={{
                    color:"var(--heading)",
                  }}
                >

                  Excel Import

                </h3>

                <p
                  className="mt-4 max-w-md leading-8"
                  style={{
                    color:"var(--text)",
                  }}
                >

                  Import thousands of records directly
                  from Excel with automatic header
                  detection and instant field binding.

                </p>

              </div>

            </div>

            {/* Fake Excel */}

            <div
              className="mt-10 overflow-hidden rounded-2xl"
              style={{
                border:"1px solid var(--border)",
              }}
            >

              <div
                className="grid grid-cols-4"
                style={{
                  background:"rgba(89,99,87,.06)",
                }}
              >

                {["NAME","PHOTO","CLASS","DOB"].map(header=>(

                  <div
                    key={header}
                    className="border-r px-4 py-3 text-xs font-semibold"
                    style={{
                      borderColor:"var(--border)",
                      color:"var(--heading)",
                    }}
                  >

                    {header}

                  </div>

                ))}

              </div>

              {[
                ["John","IMG001","X-A","12/01"],
                ["Emma","IMG002","IV-B","09/03"],
                ["Alex","IMG003","VI-A","21/07"],
              ].map((row,index)=>(

                <div
                  key={index}
                  className="grid grid-cols-4 border-t"
                  style={{
                    borderColor:"var(--border)",
                  }}
                >

                  {row.map(cell=>(

                    <div
                      key={cell}
                      className="border-r px-4 py-3 text-sm"
                      style={{
                        borderColor:"var(--border)",
                      }}
                    >

                      {cell}

                    </div>

                  ))}

                </div>

              ))}

            </div>

          </div>

          {/* ================================================= */}

          {/* Photo Mapping */}

          {/* ================================================= */}

          <div
            className="rounded-[26px] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background:"var(--surface)",
              border:"1px solid var(--border)",
              boxShadow:"var(--shadow-md)",
            }}
          >

            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl"
              style={{
                background:"rgba(89,99,87,.08)",
              }}
            >

              <ImageIcon
                size={28}
                color="var(--primary)"
              />

            </div>

            <h3
              className="mt-6 text-2xl font-semibold"
              style={{
                color:"var(--heading)",
              }}
            >

              Automatic Photo Mapping

            </h3>

            <p
              className="mt-4 leading-8"
              style={{
                color:"var(--text)",
              }}
            >

              Upload one ZIP containing thousands of
              photographs and Card Engine automatically
              maps every photo using its filename.

            </p>

            <div className="mt-10 space-y-4">

              {[
                ["IMG0001","John Doe"],
                ["IMG0002","Emma Smith"],
                ["IMG0003","Alex Wilson"],
                ["IMG0004","Sophia Brown"],
              ].map(([photo,name])=>(

                <div
                  key={photo}
                  className="flex items-center justify-between rounded-xl px-5 py-4"
                  style={{
                    background:"rgba(89,99,87,.05)",
                  }}
                >

                  <span
                    className="font-medium"
                    style={{
                      color:"var(--heading)",
                    }}
                  >

                    {photo}

                  </span>

                  <ArrowRight
                    size={18}
                    color="var(--muted)"
                  />

                  <span>

                    {name}

                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* ================================================= */}

          {/* Visual Editor */}

          {/* ================================================= */}

          <div
            className="lg:col-span-2 overflow-hidden rounded-[30px] p-10 transition-all duration-300 hover:-translate-y-1"
            style={{
              background:"var(--surface)",
              border:"1px solid var(--border)",
              boxShadow:"var(--shadow-lg)",
            }}
          >

            <div className="grid gap-10 lg:grid-cols-2">

              {/* LEFT */}

              <div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background:"rgba(89,99,87,.08)",
                  }}
                >

                  <PenTool
                    size={28}
                    color="var(--primary)"
                  />

                </div>

                <h3
                  className="mt-6 text-3xl font-semibold"
                  style={{
                    color:"var(--heading)",
                  }}
                >

                  Professional Visual Editor

                </h3>

                <p
                  className="mt-5 leading-9"
                  style={{
                    color:"var(--text)",
                  }}
                >

                  Design your ID card visually using drag &
                  drop. Resize, align, bind Excel fields,
                  preview instantly and generate without
                  writing a single line of code.

                </p>

                <div className="mt-8 space-y-4">

                  {[
                    "Drag & Drop",
                    "Live Preview",
                    "Text Alignment",
                    "Automatic Binding",
                  ].map(item=>(

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        color="var(--primary)"
                      />

                      {item}

                    </div>

                  ))}

                </div>

              </div>

              {/* Fake Editor */}

              <div
                className="rounded-2xl p-6"
                style={{
                  background:"#FCFBF9",
                  border:"1px solid var(--border)",
                }}
              >

                <div
                  className="mx-auto aspect-[1/1.4] w-[250px] rounded-xl"
                  style={{
                    background:"white",
                    border:"1px solid var(--border)",
                    boxShadow:"var(--shadow-md)",
                  }}
                >

                  <div
                    className="mx-auto mt-6 h-24 w-20 rounded-lg"
                    style={{
                      background:"rgba(89,99,87,.10)",
                    }}
                  />

                  <div className="space-y-3 px-6 pt-8">

                    <div className="h-3 rounded bg-stone-200"/>

                    <div className="h-3 w-4/5 rounded bg-stone-200"/>

                    <div className="h-3 w-3/5 rounded bg-stone-200"/>

                    <div className="h-3 w-2/3 rounded bg-stone-200"/>

                  </div>

                  <div
                    className="mx-auto mt-8 h-12 w-44 rounded-lg border-2 border-dashed"
                    style={{
                      borderColor:"var(--primary)",
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

                    {/* ================================================= */}

          {/* Multi-threaded Generation */}

          {/* ================================================= */}

          <div
            className="overflow-hidden rounded-[26px] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >

            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl"
              style={{
                background: "rgba(89,99,87,.08)",
              }}
            >

              <Cpu
                size={28}
                color="var(--primary)"
              />

            </div>

            <h3
              className="mt-6 text-2xl font-semibold"
              style={{
                color: "var(--heading)",
              }}
            >

              High-Speed Generation

            </h3>

            <p
              className="mt-4 leading-8"
              style={{
                color: "var(--text)",
              }}
            >

              Multiple workers generate thousands of cards
              simultaneously while maintaining excellent
              print quality.

            </p>

            <div className="mt-10">

              <div className="mb-5 flex justify-between">

                <span
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  Processing...
                </span>

                <span
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  87%
                </span>

              </div>

              <div
                className="h-3 overflow-hidden rounded-full"
                style={{
                  background: "rgba(89,99,87,.08)",
                }}
              >

                <div
                  className="h-full rounded-full"
                  style={{
                    width: "87%",
                    background: "var(--primary)",
                  }}
                />

              </div>

            </div>

            <div className="mt-10 grid grid-cols-4 gap-3">

              {[1,2,3,4,5,6,7,8].map(worker=>(

                <div
                  key={worker}
                  className="rounded-xl py-4 text-center text-sm font-medium"
                  style={{
                    background: "rgba(89,99,87,.06)",
                  }}
                >

                  W{worker}

                </div>

              ))}

            </div>

          </div>

          {/* ================================================= */}

          {/* PDF */}

          {/* ================================================= */}

          <div
            className="overflow-hidden rounded-[26px] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >

            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl"
              style={{
                background: "rgba(89,99,87,.08)",
              }}
            >

              <FileText
                size={28}
                color="var(--primary)"
              />

            </div>

            <h3
              className="mt-6 text-2xl font-semibold"
              style={{
                color: "var(--heading)",
              }}
            >

              Print-ready PDF

            </h3>

            <p
              className="mt-4 leading-8"
              style={{
                color: "var(--text)",
              }}
            >

              Automatically arrange generated cards onto A4
              sheets for professional printing with minimal
              paper waste.

            </p>

            <div
              className="mx-auto mt-10 aspect-[1/1.4] w-56 rounded-xl p-4"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >

              <div className="grid grid-cols-2 gap-2">

                {Array.from({ length:8  }).map((_, index)=>(

                  <div
                    key={index}
                    className="aspect-[1/0.7] rounded"
                    style={{
                      background: "rgba(89,99,87,.08)",
                    }}
                  />

                ))}

              </div>

            </div>

          </div>

          {/* ================================================= */}

          {/* ZIP */}

          {/* ================================================= */}

          <div
            className="lg:col-span-2 overflow-hidden rounded-[30px] p-10 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >

            <div className="grid items-center gap-12 lg:grid-cols-2">

              <div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(89,99,87,.08)",
                  }}
                >

                  <Archive
                    size={28}
                    color="var(--primary)"
                  />

                </div>

                <h3
                  className="mt-6 text-3xl font-semibold"
                  style={{
                    color: "var(--heading)",
                  }}
                >

                  One-click ZIP Export

                </h3>

                <p
                  className="mt-5 leading-9"
                  style={{
                    color: "var(--text)",
                  }}
                >

                  Download every generated JPEG together
                  with the printable PDF inside a single
                  archive ready to share or print.

                </p>

              </div>

              <div
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(89,99,87,.05)",
                }}
              >

                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                  }}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className="font-semibold"
                      style={{
                        color: "var(--heading)",
                      }}
                    >

                      CardEngine.zip

                    </span>

                    <Archive
                      size={20}
                      color="var(--primary)"
                    />

                  </div>

                  <div className="mt-6 space-y-4">

                    {[
                      "cards.pdf",
                      "000001.jpg",
                      "000002.jpg",
                      "000003.jpg",
                      "... 1245 more",
                    ].map(file=>(

                      <div
                        key={file}
                        className="flex justify-between text-sm"
                      >

                        <span>{file}</span>

                        <CheckCircle2
                          size={16}
                          color="var(--success)"
                        />

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}