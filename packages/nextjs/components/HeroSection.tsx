"use client";

export function HeroSection() {
  return (
    <div className="relative">
      <div className="container flex flex-col-reverse md:flex-row items-center justify-center py-12 md:py-24 gap-8 mx-auto">
        <div className="flex-1 space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Make Smart Contracts Simple and Safe!
            </h1>
            <h2 className="text-3xl font-semibold tracking-tighter text-primary">
              Your Security Matters
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Our easy-to-use tool helps you check if your smart contract is safe or risky. No technical knowledge needed—just upload your contract and let us do the rest!
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-lg">
              <div className="w-full h-full bg-black/80 rounded-lg p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <div className="w-3 h-3 rounded-full bg-current" />
                  <div className="h-px flex-1 bg-current/30" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-gray-700 rounded"
                      style={{
                        width: `${Math.random() * 50 + 50}%`,
                        opacity: 1 - i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-primary/80 text-sm font-mono">
                  Analyzing Your Smart Contract...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
