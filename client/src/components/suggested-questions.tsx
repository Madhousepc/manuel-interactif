import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="space-y-3" data-testid="suggested-questions">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageCircleQuestion className="h-4 w-4" />
        <span>Questions suggérées :</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(question)}
            className="text-xs h-auto py-2 px-3 rounded-full hover-elevate active-elevate-2"
            data-testid={`suggested-question-${index}`}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
