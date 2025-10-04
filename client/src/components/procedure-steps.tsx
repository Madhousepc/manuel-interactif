import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
  note?: string;
}

interface ProcedureStepsProps {
  steps: ProcedureStep[];
}

export function ProcedureSteps({ steps }: ProcedureStepsProps) {
  return (
    <div className="space-y-4" data-testid="procedure-steps">
      {steps.map((step, index) => (
        <div
          key={step.stepNumber}
          className="relative pl-8"
          data-testid={`step-${step.stepNumber}`}
        >
          {/* Vertical line connector */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-current/20" />
          )}

          {/* Step number circle */}
          <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm font-semibold">
            {step.stepNumber}
          </div>

          {/* Step content */}
          <div className="ml-2">
            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
              {step.title}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {step.description}
            </p>

            {/* Note if present */}
            {step.note && (
              <div className="mt-2 p-3 rounded-md bg-warning/10 border-l-4 border-warning flex gap-2">
                <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm opacity-90">
                  <span className="font-medium">Note:</span> {step.note}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Completion indicator */}
      <div className="flex items-center gap-2 pt-2 text-sm opacity-75">
        <CheckCircle2 className="h-4 w-4" />
        <span>Procédure complète</span>
      </div>
    </div>
  );
}
