import { ReactNode, useRef } from "react";
import useIntersectionOnce from "@/lib/hooks/useIntersectionOnce";

type Props = {
  children: ReactNode;
  minHeight?: number;
};

export default function LazyMount({ children, minHeight = 120 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionOnce(ref, { rootMargin: "200px" });

  return (
    <div ref={ref} style={{ minHeight }}>
      {isVisible ? children : <div className="h-full w-full rounded-xl border bg-card animate-pulse" />}
    </div>
  );
}
