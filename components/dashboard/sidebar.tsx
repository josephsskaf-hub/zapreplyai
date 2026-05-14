"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  MessageSquare,
  LayoutDashboard,
  MessageCircle,
  Bot,
  Link2,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/conversas", label: "Conversas", icon: MessageCircle },
  { href: "/dashboard/configurar-ia", label: "Configurar IA", icon: Bot },
  { href: "/dashboard/integracoes", label: "Integrações", icon: Link2 },
  { href: "/dashboard/planos", label: "Planos", icon: CreditCard },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
];

export function DashboardSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logout realizado" });
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-[#25D366]" />
          <span className="text-xl font-bold text-white">ZapReply AI</span>
        </div>
      </div>
      <Separator className="bg-[#1a1a1a]" />
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              pathname === href
                ? "bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20"
                : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <Separator className="bg-[#1a1a1a]" />
      <div className="p-4">
        {userEmail && (
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#25D366]/20 text-[#25D366] text-xs">
                {userEmail[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-400 truncate flex-1">{userEmail}</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a] gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-60 flex-col bg-[#111111] border-r border-[#1a1a1a] shrink-0">
        <SidebarContent />
      </aside>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-[#111111] border border-[#1a1a1a] text-white"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-60 bg-[#111111] border-r border-[#1a1a1a]">
            <div className="pt-16">
              <SidebarContent />
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}

export default DashboardSidebar;
