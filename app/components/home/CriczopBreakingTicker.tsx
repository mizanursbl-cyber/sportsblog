import { motion } from "framer-motion";
import { useCriczopFeed } from "@/hooks/useCriczopFeed";

export default function CriczopBreakingTicker() {
  const { items, loading } = useCriczopFeed(20, 60_000);

  const text =
    loading || items.length === 0
      ? "Loading cricket headlines..."
      : items.map((x) => x.title).join("  •  ");

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="whitespace-nowrap text-sm font-semibold"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {text}
      </motion.div>
    </div>
  );
}
