import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            Z
          </span>
          <span className="text-lg font-bold text-slate-900">{APP_NAME}</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link
            href="/#funcionalidades"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Funcionalidades
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Preços
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Começar grátis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
