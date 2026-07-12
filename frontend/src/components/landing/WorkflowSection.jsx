import {
  FileSpreadsheet,
  ImageIcon,
  PenTool,
  Cpu,
  Archive,
} from "lucide-react";

import { motion } from "framer-motion";

const steps = [

  {
    icon: FileSpreadsheet,
    title: "Import Excel",
    text: "Upload student records",
    side: "left",
  },

  {
    icon: ImageIcon,
    title: "Upload Photos",
    text: "Automatic photo mapping",
    side: "right",
  },

  {
    icon: PenTool,
    title: "Design Layout",
    text: "Drag, resize and bind fields",
    side: "left",
  },

  {
    icon: Cpu,
    title: "Generate",
    text: "Multi-threaded rendering",
    side: "right",
  },

  {
    icon: Archive,
    title: "Download",
    text: "PDF, JPG and ZIP export",
    side: "left",
  },

];

export default function WorkflowSection() {

  return (

    <section
  id="workflow"
  className="py-28"
>

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <motion.div

          initial={{
            opacity:0,
            y:40,
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

          className="mx-auto max-w-3xl text-center"

        >

          <span

            className="rounded-full px-4 py-2 text-sm font-medium"

            style={{

              background:"rgba(198,185,167,.18)",

              border:"1px solid var(--border)",

              color:"var(--heading)",

            }}

          >

            Workflow

          </span>

          <h2

            className="mt-8 text-5xl font-bold"

            style={{

              color:"var(--heading)",

            }}

          >

            From Spreadsheet

            <br/>

            to Finished Cards

          </h2>

          <p

            className="mt-6 text-lg leading-8"

            style={{

              color:"var(--text)",

            }}

          >

            Five simple steps from import to print.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Vertical Line */}

          <div
  className="absolute left-1/2 top-0 h-full -translate-x-1/2"
>

  {/* Background Line */}

  <div

    className="absolute inset-0 w-[2px]"

    style={{

      background:
        "rgba(89,99,87,.12)",

    }}

  />

  {/* Growing Line */}

  <motion.div

    initial={{

      scaleY:0,

    }}

    whileInView={{

      scaleY:1,

    }}

    viewport={{

      once:false,

      amount:.3,

    }}

    transition={{

      duration:1.2,

    }}

    style={{

      transformOrigin:"top",

      background:"var(--primary)",

      opacity:.35,

    }}

    className="absolute inset-0 w-[2px]"

  />

  {/* Moving Glow */}

  <motion.div

    initial={{

      y:0,

      opacity:0,

    }}

    whileInView={{

      y:"100%",

      opacity:[0,1,1,0],

    }}

    viewport={{

      once:false,

      amount:.3,

    }}

    transition={{

      duration:2.8,

      repeat:Infinity,

      ease:"linear",

    }}

    className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full"

    style={{

      background:"var(--primary)",

      boxShadow:
        "0 0 18px rgba(89,99,87,.45)",

    }}

  />

</div>

          <div className="space-y-20">

            {steps.map((step,index)=>{

              const Icon=step.icon;

              const left=step.side==="left";

              return(

                <motion.div

                  key={step.title}

                  initial={{

    opacity:0,

    x:left?-80:80,

    scale:.95,

}}

                  whileInView={{

    opacity:1,

    x:0,

    scale:1,

}}

                  viewport={{

                    once:false,

                    amount:.4,

                  }}

                  transition={{

    duration:.75,

    ease:"easeOut",

    delay:index*.08,

}}

                  className="relative grid items-center md:grid-cols-[1fr_80px_1fr]"

                >

                  {/* LEFT */}

                  <div

                    className={`${
                      left
                      ? "text-right pr-12"
                      : "opacity-0"
                    }`}

                  >

                    {left && (

                      <>

                        <h3

                          className="text-xl font-semibold"

                          style={{

                            color:"var(--heading)",

                          }}

                        >

                          {step.title}

                        </h3>

                        <p

                          className="mt-2"

                          style={{

                            color:"var(--muted)",

                          }}

                        >

                          {step.text}

                        </p>

                      </>

                    )}

                  </div>

                  {/* Circle */}

                  <div className="flex justify-center">

                    <motion.div

                      whileHover={{

  scale:1.12,

  rotate:3,

}}
whileTap={{

  scale:.95,

}}

                      transition={{

                        duration:.2,

                      }}

                      className="flex h-14 w-14 items-center justify-center rounded-full"

                      style={{

                        background:"white",

                        border:"2px solid var(--border)",

                        boxShadow:
"0 12px 35px rgba(89,99,87,.14)",

                      }}

                    >

                      <motion.div

    whileHover={{

        rotate:-12,

        scale:1.08,

    }}

    transition={{

        duration:.25,

    }}

>

    <Icon

        size={24}

        color="var(--primary)"

    />

</motion.div>

                    </motion.div>

                  </div>

                  {/* RIGHT */}

                  <div

                    className={`${
                      !left
                      ? "pl-12"
                      : "opacity-0"
                    }`}

                  >

                    {!left && (

                      <>

                        <h3

                          className="text-xl font-semibold"

                          style={{

                            color:"var(--heading)",

                          }}

                        >

                          {step.title}

                        </h3>

                        <p

                          className="mt-2"

                          style={{

                            color:"var(--muted)",

                          }}

                        >

                          {step.text}

                        </p>

                      </>

                    )}

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>

    </section>

  );

}