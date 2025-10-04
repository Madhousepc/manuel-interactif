import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type ManualSection } from "@shared/schema";
import { BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";

export default function ManuelSection() {
  const [, params] = useRoute("/manuel/:category");
  const category = params?.category;

  const { data: sections, isLoading } = useQuery<ManualSection[]>({
    queryKey: ["/api/manual/sections", category],
    enabled: !!category,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <EmptyState
          icon={BookOpen}
          title="Section non trouvée"
          description="Cette section du manuel n'est pas encore disponible."
        />
      </div>
    );
  }

  const categoryTitles: Record<string, string> = {
    catalogue: "Catalogue en ligne",
    pret: "Prêt de documents",
    retour: "Retour de documents",
    catalogage: "Catalogage",
    donnees: "Données",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryTitles[category || ""] || "Manuel"}
        </h1>
        <p className="text-muted-foreground">
          Documentation complète pour cette section
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id} data-testid={`section-${section.id}`}>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-foreground">
                  {section.content}
                </p>
              </div>
              {section.subsection && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Sous-section: <span className="font-medium">{section.subsection}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
