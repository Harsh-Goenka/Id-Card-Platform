import {
  
  Mail,
} from "lucide-react";

export default function Footer(){

  return(

    <footer

      className="border-t py-4"

      style={{
        borderColor:"var(--border)",
      }}

    >

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:justify-between">

        {/* Brand */}

        <div>

          <div

            className="flex items-center gap-3"

          >

            <div

              className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold"

              style={{
                background:"var(--primary)",
                color:"white",
              }}

            >

              CE

            </div>

            <div>

              <h2

                className="text-2xl font-bold"

                style={{
                  color:"var(--heading)",
                }}

              >

                Card Engine

              </h2>

              <p

                className="mt-1"

                style={{
                  color:"var(--muted)",
                }}

              >

                Professional Bulk ID Card Generation

              </p>

            </div>

          </div>

        </div>

        {/* Links */}

        <div className="grid gap-12 sm:grid-cols-3">

          <div>

            <h3

              className="mb-5 font-semibold"

              style={{
                color:"var(--heading)",
              }}

            >

              Product

            </h3>

            <div className="space-y-3">

              <a href="#features">Features</a>

              <br/>

              <a href="#workflow">Workflow</a>

            </div>

          </div>

          <div>

            <h3

              className="mb-5 font-semibold"

              style={{
                color:"var(--heading)",
              }}

            >

              Developer

            </h3>

            <p>

              Harsh Goenka

            </p>

            <div

              className="mt-4 flex items-center gap-2"

            >

              <Mail size={16}/>

              <a href="mailto:harshgoenka2004@gmail.com">

                harshgoenka2004@gmail.com

              </a>

            </div>

            <div

              className="mt-3 flex items-center gap-2"

            >

              <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>

              <a

                href="https://github.com/Harsh-Goenka/Id-Card-Platform"

                target="_blank"

                rel="noreferrer"

              >

                GitHub Repository

              </a>

            </div>

          </div>

          <div>

            <h3

              className="mb-5 font-semibold"

              style={{
                color:"var(--heading)",
              }}

            >

              Built With

            </h3>

            <p>React</p>

            <p>Node.js</p>

            <p>MongoDB</p>

            <p>Canvas</p>

            <p>Express</p>

          </div>

        </div>

      </div>

      <div

        className="mx-auto mt-2 max-w-7xl border-t pt-8 text-center"

        style={{
          borderColor:"var(--border)",
          color:"var(--muted)",
        }}

      >

        © {new Date().getFullYear()} Card Engine · Designed & Developed by Harsh Goenka

      </div>

    </footer>

  );

}