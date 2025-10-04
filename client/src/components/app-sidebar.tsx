import { BookOpen, BookmarkPlus, BookmarkMinus, FolderPlus, Database, Home, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const categories = [
  { id: "home", title: "Accueil", icon: Home, path: "/" },
  { id: "chat", title: "Assistant Interactif", icon: MessageSquare, path: "/chat" },
];

const manualSections = [
  { id: "catalogue", title: "Catalogue en ligne", icon: BookOpen, path: "/manuel/catalogue" },
  { id: "pret", title: "Prêt de documents", icon: BookmarkPlus, path: "/manuel/pret" },
  { id: "retour", title: "Retour de documents", icon: BookmarkMinus, path: "/manuel/retour" },
  { id: "catalogage", title: "Catalogage", icon: FolderPlus, path: "/manuel/catalogage" },
  { id: "donnees", title: "Données", icon: Database, path: "/manuel/donnees" },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Manuel Interactif</h2>
            <p className="text-xs text-muted-foreground">Catalogue Bibliothèque</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.path}
                    data-testid={`link-${item.id}`}
                  >
                    <Link href={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sections du Manuel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manualSections.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.path}
                    data-testid={`link-${item.id}`}
                  >
                    <Link href={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
