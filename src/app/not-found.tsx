import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] space-y-6 px-4 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary animate-fade-in">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl animate-fade-in">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-[500px] mx-auto animate-fade-in">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. But don&apos;t worry, you can always go back to the home page or check out my projects.
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-8 animate-fade-in">
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
          >
            View Projects
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
        <p>🚀 Full Stack Developer | MERN | Next.js</p>
      </div>
    </div>
  );
}
