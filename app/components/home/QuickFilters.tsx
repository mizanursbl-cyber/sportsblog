import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useLocalStorageState from "@/lib/hooks/useLocalStorageState";

export type HomeCategory = "all" | "cricket" | "football" | "others";

type Props = {
  value: HomeCategory;
  onChange: (v: HomeCategory) => void;
};

export default function QuickFilters({ value, onChange }: Props) {
  const { language } = useLanguage();

  const categories: { id: HomeCategory; label: string }[] = useMemo(() => {
    return [
      { id: "all", label: language === "bn" ? "সব" : "All" },
      { id: "cricket", label: language === "bn" ? "ক্রিকেট" : "Cricket" },
      { id: "football", label: language === "bn" ? "ফুটবল" : "Football" },
      { id: "others", label: language === "bn" ? "অন্যান্য" : "Others" },
    ];
  }, [language]);

  const [pinned, setPinned] = useLocalStorageState<HomeCategory[]>(
    "home:pinnedCategories",
    ["cricket", "football"]
  );

  const togglePin = (cat: HomeCategory) => {
    if (cat === "all") return;
    setPinned((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-foreground dark:text-white">
            {language === "bn" ? "দ্রুত ফিল্টার" : "Quick Filters"}
          </div>
          <div className="text-xs text-muted-foreground">
            {language === "bn"
              ? "পছন্দের ক্যাটাগরি পিন করুন"
              : "Pin your favorite categories"}
          </div>
        </div>

        <Badge variant="secondary">
          {language === "bn" ? "ফিল্টার:" : "Filter:"}{" "}
          {categories.find((c) => c.id === value)?.label}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = value === c.id;
          const isPinned = pinned.includes(c.id);

          return (
            <div key={c.id} className="flex items-center gap-1">
              <Button
                variant={active ? "default" : "outline"}
                onClick={() => onChange(c.id)}
                className="rounded-full"
              >
                {c.label}
              </Button>

              {c.id !== "all" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePin(c.id)}
                  title={isPinned ? "Unpin" : "Pin"}
                  className="rounded-full"
                >
                  <Star
                    size={16}
                    className={isPinned ? "fill-current" : ""}
                  />
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
