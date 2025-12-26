import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
};

export default function Section({ title, subtitle, actionLabel, onAction, children }: Props) {
  return (
    <section className="w-full">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground dark:text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {actionLabel && onAction ? (
          <Button variant="outline" onClick={onAction} className="shrink-0">
            {actionLabel}
          </Button>
        ) : null}
      </div>

      <Card className="p-4 sm:p-6">{children}</Card>
    </section>
  );
}
