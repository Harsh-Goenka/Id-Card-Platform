import {
  Cpu,
  FileSpreadsheet,
  ImageIcon,
  Download,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

const capabilities = [

  {
    icon: Cpu,
    title: "Parallel Generation",
    text: "Generate cards using multiple workers for faster processing.",
  },

  {
    icon: ImageIcon,
    title: "Automatic Photo Mapping",
    text: "Photos are matched instantly using filenames.",
  },

  {
    icon: Download,
    title: "Print-ready Export",
    text: "Generate JPEG, PDF and ZIP files with one click.",
  },

  {
    icon: FileSpreadsheet,
    title: "Excel Driven",
    text: "Update one spreadsheet and regenerate in seconds.",
  },

];

export default function PerformanceSection() {

  return (

    <section id="performance"className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div

            initial={{
              opacity:0,
              x:-50,
            }}

            whileInView={{
              opacity:1,
              x:0,
            }}

            viewport={{
              once:false,
              amount:.3,
            }}

            transition={{
              duration:.7,
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

              Why Card Engine

            </span>

            <h2

              className="mt-7 text-5xl font-bold"

              style={{
                color:"var(--heading)",
              }}

            >

              Built for

              <br/>

              Real Production

            </h2>

            <p

              className="mt-6 max-w-xl text-lg leading-9"

              style={{
                color:"var(--text)",
              }}

            >

              Designed for schools,
              colleges, universities,
              organizations and businesses
              that need professional ID card
              generation at scale.

            </p>

            <div className="mt-10 space-y-7">

              {capabilities.map((item,index)=>{

                const Icon=item.icon;

                return(

                  <motion.div

                    key={item.title}

                    initial={{
                      opacity:0,
                      x:-20,
                    }}

                    whileInView={{
                      opacity:1,
                      x:0,
                    }}

                    transition={{
                      delay:index*.12,
                    }}

                    viewport={{
                      once:false,
                    }}

                    className="flex gap-4"

                  >

                    <div

                      className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl"

                      style={{
                        background:"rgba(89,99,87,.08)",
                      }}

                    >

                      <Icon

                        size={22}

                        color="var(--primary)"

                      />

                    </div>

                    <div>

                      <h3

                        className="font-semibold"

                        style={{
                          color:"var(--heading)",
                        }}

                      >

                        {item.title}

                      </h3>

                      <p

                        className="mt-2 leading-7"

                        style={{
                          color:"var(--muted)",
                        }}

                      >

                        {item.text}

                      </p>

                    </div>

                  </motion.div>

                );

              })}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div

            initial={{
              opacity:0,
              x:50,
            }}

            whileInView={{
              opacity:1,
              x:0,
            }}

            viewport={{
              once:false,
              amount:.3,
            }}

            transition={{
              duration:.7,
            }}

          >

            <div className="grid grid-cols-2 gap-5">

              {[
                {
                  title:"Parallel Workers",
                  value:"Enabled",
                },
                {
                  title:"Photo Mapping",
                  value:"Automatic",
                },
                {
                  title:"Export",
                  value:"JPEG • PDF • ZIP",
                },
                {
                  title:"Visual Editor",
                  value:"Drag & Drop",
                },
              ].map((card,index)=>(

                <motion.div

                  key={card.title}

                  initial={{
                    opacity:0,
                    y:30,
                  }}

                  whileInView={{
                    opacity:1,
                    y:0,
                  }}

                  transition={{
                    delay:index*.12,
                  }}

                  viewport={{
                    once:false,
                  }}

                  whileHover={{
                    y:-6,
                  }}

                  className="rounded-[22px] p-7"

                  style={{
                    background:"var(--surface)",
                    border:"1px solid var(--border)",
                    boxShadow:"var(--shadow-md)",
                  }}

                >

                  <CheckCircle2

                    size={26}

                    color="var(--success)"

                  />

                  <p

                    className="mt-8 text-sm"

                    style={{
                      color:"var(--muted)",
                    }}

                  >

                    {card.title}

                  </p>

                  <h3

                    className="mt-2 text-xl font-semibold leading-8"

                    style={{
                      color:"var(--heading)",
                    }}

                  >

                    {card.value}

                  </h3>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  );

}