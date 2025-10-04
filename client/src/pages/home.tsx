import { BookOpen, BookmarkPlus, BookmarkMinus, FolderPlus, Database, MessageSquare, Search } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";

const categories = [
  {
    id: "catalogue",
    title: "Catalogue en ligne",
    description: "Rechercher des documents, gérer les favoris, emprunts et réservations",
    icon: BookOpen,
    href: "/manuel/catalogue",
  },
  {
    id: "pret",
    title: "Prêt de documents",
    description: "Scanner et emprunter des documents pour les lecteurs",
    icon: BookmarkPlus,
    href: "/manuel/pret",
  },
  {
    id: "retour",
    title: "Retour de documents",
    description: "Gérer les retours de documents et les amendes",
    icon: BookmarkMinus,
    href: "/manuel/retour",
  },
  {
    id: "catalogage",
    title: "Catalogage",
    description: "Créer de nouvelles notices, gérer les index et bibliographies",
    icon: FolderPlus,
    href: "/manuel/catalogage",
  },
  {
    id: "donnees",
    title: "Données",
    description: "Gérer les notices, exemplaires et imprimer les cotes",
    icon: Database,
    href: "/manuel/donnees",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/chat?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Manuel Interactif
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
              Catalogue en Ligne de Bibliothèque
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Posez vos questions et obtenez des procédures détaillées étape par étape pour utiliser le système de catalogue.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
              <Input
                type="search"
                placeholder="Posez une question... Ex: Comment rechercher un document?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-base rounded-xl"
                data-testid="input-home-search"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 rounded-xl"
                data-testid="button-home-search"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Accès Rapide</h3>
          <p className="text-muted-foreground">
            Accédez directement aux différentes sections du manuel
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>

        {/* Chat Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Assistant Interactif IA
              </h3>
              <p className="text-muted-foreground">
                Discutez avec notre assistant intelligent pour obtenir des réponses instantanées à vos questions
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setLocation("/chat")}
              className="rounded-xl"
              data-testid="button-start-chat"
            >
              Commencer la discussion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
