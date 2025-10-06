export default function SportsVisionPage() {
  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Vision Section */}
        <section className="text-center space-y-6">
          <div className="relative py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
            <h2 className="text-7xl font-extralight tracking-wider">
              <span className="text-gray-900">Our</span>{" "}
              <span style={{ color: "#E99544" }}>vision</span>
            </h2>
            <div className="mt-2">
              <svg
                className="mx-auto"
                width="360"
                height="24"
                viewBox="0 0 360 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="12"
                  x2="120"
                  y2="12"
                  stroke="#E99544"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="240"
                  y1="12"
                  x2="360"
                  y2="12"
                  stroke="#E99544"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <g transform="translate(150,0)">
                  <path d="M30 12 L40 6 L50 12 L40 18 Z" fill="#E99544" />
                  <path
                    d="M34 12 L40 8.5 L46 12 L40 15.5 Z"
                    fill="none"
                    stroke="#E99544"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="max-w-2xl mx-auto pt-4">
            <p className="text-lg text-gray-800 leading-relaxed font-semibold">
              Al-Rasheed Academy will provide each student with a Safe, Healthy,
              Nurturing, and Islamic learning environment facilitated by
              skilled, creative, and highly motivated professionals who promote
              lifelong learning.
            </p>
          </div>
        </section>

        {/* Missions Section */}
        <section className="text-center space-y-8">
          <div className="relative py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
            <h2 className="text-7xl font-extralight tracking-wider">
              <span className="text-gray-900">Our</span>{" "}
              <span style={{ color: "#E99544" }}>missions</span>
            </h2>
            <div className="mt-2">
              <svg
                className="mx-auto"
                width="360"
                height="24"
                viewBox="0 0 360 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="12"
                  x2="120"
                  y2="12"
                  stroke="#E99544"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="240"
                  y1="12"
                  x2="360"
                  y2="12"
                  stroke="#E99544"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <g transform="translate(150,0)">
                  <path d="M30 12 L40 6 L50 12 L40 18 Z" fill="#E99544" />
                  <path
                    d="M34 12 L40 8.5 L46 12 L40 15.5 Z"
                    fill="none"
                    stroke="#E99544"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="text-sm text-gray-800 max-w-xl mx-auto space-y-1 font-semibold">
              <div className="text-sm text-gray-800 max-w-2xl mx-auto space-y-1 font-semibold text-center">
                <p className="leading-relaxed">
                  Al-Rasheed Academy supports the total development of each
                  student. As each student develops, he / she will become an
                  upstanding citizen, an effective and productive individual for
                  their family, the community, and the world.
                </p>
              </div>
            </div>

            {/* Three Circles */}
            <div className="flex flex-wrap justify-center items-center gap-0 pt-6">
              {/* Circle 1 */}
              <div className="w-56 h-56 rounded-full bg-white/60 backdrop-blur-sm border border-gray-300 flex items-center justify-center p-8 -mr-6">
                <p className="text-gray-700 text-sm text-center leading-relaxed">
                  Provide a
                  <br />
                  <span className="font-bold text-base">
                    Safe &amp; Healthy
                  </span>
                  <br />
                  Nurturing Islamic Environment
                </p>
              </div>

              {/* Circle 2 */}
              <div className="w-56 h-56 rounded-full bg-white/60 backdrop-blur-sm border border-gray-300 flex items-center justify-center p-8 -mr-6 z-10">
                <p className="text-gray-700 text-sm text-center leading-relaxed">
                  Skilled, Creative &amp;
                  <br />
                  <span className="font-bold text-base">Highly Motivated</span>
                  <br />
                  Professionals
                </p>
              </div>

              {/* Circle 3 - Blue */}
              <div
                className="w-56 h-56 rounded-full flex items-center justify-center p-8 shadow-xl z-20"
                style={{ backgroundColor: "#E99544" }}
              >
                <p className="text-white text-sm text-center leading-relaxed">
                  Total development of
                  <br />
                  <span className="font-bold text-base">each student</span>
                  <br />
                  Upstanding citizen &amp; productive individual
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <section className="mt-8">
            <div
              className="rounded-2xl overflow-hidden shadow-lg mx-4 md:mx-0"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/1200x/31/43/2d/31432d4612d0211c4070c1389cb2ecd7.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "240px",
              }}
            >
              <div className="bg-white/10 p-6 md:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                    Philosophy Statement
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    The education of the students at Al-Rasheed Academy is the
                    responsibility of the entire community. We believe that the
                    children of the community are the most important resource
                    and future leaders. It is important that we encourage
                    students to develop good Islamic characteristics,
                    citizenship, high moral standards, and positive self-esteem.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-4">
                    We recognize that we exist in a worldwide community and that
                    our educational program must reflect global needs. Our goal
                    is to provide a positive Islamic learning environment that
                    challenges students to grow mentally, academically,
                    physically, and socially while ultimately preparing students
                    to become productive members of society.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="relative pt-8">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
