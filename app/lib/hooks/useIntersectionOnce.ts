import { RefObject, useEffect, useState } from "react";

export default function useIntersectionOnce<T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options, visible]);

  return visible;
}
