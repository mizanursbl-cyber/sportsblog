import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InlineAdCard() {
  const { language } = useLanguage();

  return (
    <Card className="p-5 border-dashed">
      <div className="text-sm font-semibold text-muted-foreground">
        {language === "bn" ? "স্পন্সরড" : "Sponsored"}
      </div>
      <div className="mt-2 text-lg font-bold text-foreground dark:text-white">
        {language === "bn" ? "এখানে আপনার বিজ্ঞাপন দিন" : "Place your ad here"}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {language === "bn"
          ? "পরে আমরা গুগল অ্যাডস/ব্যানার যুক্ত করতে পারি।"
          : "Later we can plug in Google Ads / banners."}
      </p>
    </Card>
  );
}
