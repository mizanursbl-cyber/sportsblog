import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BreakingTicker() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();

  const items =
    language === "bn"
      ? [
          "ব্রেকিং: বাংলাদেশ ক্রিকেট বোর্ড নতুন স্কোয়াড ঘোষণা করেছে",
          "ফুটবল: লীগ টেবিলে নাটকীয় পরিবর্তন—শেষ ১০ মিনিটে গোল",
          "হাইলাইটস: আজকের সেরা মুহূর্তগুলো দেখুন",
        ]
      : [
          "Breaking: Bangladesh squad update announced",
          "Football: Table shaken after a late winner",
          "Highlights: Watch today’s top moments",
        ];

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-3 px-3 py-2">
        <Badge className="bg-destructive text-destructive-foreground">
          {language === "bn" ? "ব্রেকিং" : "BREAKING"}
        </Badge>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={reduceMotion ? undefined : { x: ["0%", "-60%"] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 18, repeat: Infinity, ease: "linear" }
            }
          >
            {items.concat(items).map((text, idx) => (
              <span
                key={`${idx}-${text}`}
                className="text-sm text-foreground/90 dark:text-white/90"
              >
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
