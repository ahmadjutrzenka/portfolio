"use client";

import { usePathname } from "next/navigation";
import { FloatingDock } from "../ui/floating-dock";
import {
  Home,
  User,
  FolderOpen,
  Wrench,
  GraduationCap,
  Image,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const items = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin" : "#home",
    },
    {
      title: "About",
      icon: <User className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin/about" : "#about",
    },
    {
      title: "Projects",
      icon: <FolderOpen className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin/projects" : "#projects",
    },
    {
      title: "Skills",
      icon: <Wrench className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin/skills" : "#skills",
    },
    {
      title: "Education",
      icon: (
        <GraduationCap className="h-full w-full text-[var(--text-muted)]" />
      ),
      href: isAdmin ? "/admin/credentials" : "#credentials",
    },
    {
      title: "Gallery",
      icon: <Image className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin/gallery" : "#gallery",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full text-[var(--text-muted)]" />,
      href: isAdmin ? "/admin/profile" : "#contact",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={items} />
    </nav>
  );
}
