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
  const items = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-[var(--text-muted)]" />,
      href: "#home",
    },
    {
      title: "About",
      icon: <User className="h-full w-full text-[var(--text-muted)]" />,
      href: "#about",
    },
    {
      title: "Projects",
      icon: <FolderOpen className="h-full w-full text-[var(--text-muted)]" />,
      href: "#projects",
    },
    {
      title: "Skills",
      icon: <Wrench className="h-full w-full text-[var(--text-muted)]" />,
      href: "#skills",
    },
    {
      title: "Education",
      icon: (
        <GraduationCap className="h-full w-full text-[var(--text-muted)]" />
      ),
      href: "#education",
    },
    {
      title: "Gallery",
      icon: <Image className="h-full w-full text-[var(--text-muted)]" />,
      href: "#gallery",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full text-[var(--text-muted)]" />,
      href: "#contact",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={items} />
    </nav>
  );
}
