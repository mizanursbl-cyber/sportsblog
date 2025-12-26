import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterCard() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");

  return (
    <Card className="p-4 sm:p-5">
      <div className="text-lg font-bold text-foreground dark:text-white">
        {language === "bn" ? "নিউজলেটার" : "Newsletter"}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {language === "bn"
          ? "সেরা স্পোর্টস আপডেট সরাসরি ইনবক্সে নিন।"
          : "Get the best sports updates in your inbox."}
      </p>

      <div className="mt-4 flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === "bn" ? "আপনার ইমেইল" : "Your email"}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <Button
          onClick={() => {
            // Hook this into Supabase later if you want
            alert(language === "bn" ? "ধন্যবাদ! (ডেমো)" : "Thanks! (demo)");
            setEmail("");
          }}
        >
          {language === "bn" ? "সাবস্ক্রাইব" : "Subscribe"}
        </Button>
      </div>
    </Card>
  );
}
