import { Sparkles } from "./ui/sparkles"

export function Demo() {
  return (
    <div className="w-full overflow-hidden bg-gray-50">
      <div className="mx-auto mt-32 w-full max-w-6xl">
        <div className="text-center text-3xl text-gray-800">
          <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
           Affiliation.
          </span>

          <br />

          {/* <span>Used by the leaders.</span> */}
        </div>

        <div className="mt-14 overflow-hidden">
          <div className="flex gap-16 animate-slide-left-to-right">
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Retool />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Vercel />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Remote />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Arc />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Raycast />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Retool />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Vercel />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Remote />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Arc />
            </div>
            <div className="h-32 flex items-center justify-center flex-shrink-0">
              <Raycast />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-0 h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 bg-white" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="#8350e8"
        />
      </div>
    </div>
  )
}

// logos

const Retool = () => (
  <img
    src="https://www.alrasheedacademy.org/images/Untitled-wqqwqwe.png"
    alt="Retool"
    className="max-w-full max-h-full object-contain"
  />
)

const Vercel = () => (
  <img
    src="https://www.alrasheedacademy.org/images/Untitled-qw.png"
    alt="Vercel"
    className="max-w-full max-h-full object-contain"
  />
)

const Remote = () => (
  <img
    src="https://www.alrasheedacademy.org/images/Untitled-wqe.png"
    alt="Remote"
    className="max-w-full max-h-full object-contain"
  />
)

const Arc = () => (
  <img
    src="https://cmsv2-assets.apptegy.net/uploads/9227/logo/10529/logo-web.png"
    alt="Arc"
    className="max-w-full max-h-full object-contain"
  />
)

const Raycast = () => (
  <img
    src="https://www.alrasheedacademy.org/images/District%20Logo.png"
    alt="Raycast"
    className="max-w-full max-h-full object-contain"
  />
)