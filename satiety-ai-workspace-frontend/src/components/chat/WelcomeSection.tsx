function WelcomeSection() {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-slate-100 md:text-6xl">
          Satiety
        </h1>

        <p className="mt-4 text-lg text-slate-400 md:text-xl">
          Your AI Workspace
        </p>

        <p className="mt-8 text-slate-500">
          Start a conversation and let AI help you
          code, learn, write, and create.
        </p>
      </div>
    </div>
  );
}

export default WelcomeSection;