import { useEffect, useRef, useState } from "react";

/**
 * Premium custom cursor: small glowing dot + delayed outer ring.
 * - Uses rAF + GPU transforms only.
 * - Disabled on touch/coarse pointers and when prefers-reduced-motion is set.
 * - Reads interactive state from data-cursor="button|link|card|image|project|blog"
 *   on the hovered element (or nearest ancestor) and from native tags.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<
    "default" | "button" | "link" | "card" | "image" | "project" | "blog"
  >("default");
  const [hidden, setHidden] = useState(true);

  // Capability check
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disabled =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("custom-cursor") === "off";
    setEnabled(!coarse && !reduced && !disabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (hidden) setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => dotRef.current?.classList.add("is-down");
    const onUp = () => dotRef.current?.classList.remove("is-down");

    const resolveVariant = (el: Element | null) => {
      if (!el) return "default" as const;
      const node = el.closest<HTMLElement>(
        '[data-cursor], a, button, [role="button"], img, picture, video, input, textarea, select, label'
      );
      if (!node) return "default" as const;
      const explicit = node.dataset.cursor as typeof variant | undefined;
      if (explicit) return explicit;
      const tag = node.tagName;
      if (tag === "BUTTON" || node.getAttribute("role") === "button") return "button";
      if (tag === "A") return "link";
      if (tag === "IMG" || tag === "PICTURE" || tag === "VIDEO") return "image";
      if (["INPUT", "TEXTAREA", "SELECT", "LABEL"].includes(tag)) return "button";
      return "default";
    };

    const onOver = (e: PointerEvent) => {
      const next = resolveVariant(e.target as Element);
      setVariant((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      // Dot follows almost 1:1; ring eases for the trailing effect.
      dot.current.x += (target.current.x - dot.current.x) * 0.9;
      dot.current.y += (target.current.y - dot.current.y) * 0.9;
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(14px, 14px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, hidden]);

  if (!enabled) return null;

  const label =
    variant === "project"
      ? "Open Project"
      : variant === "blog"
        ? "Read"
        : variant === "image"
          ? "View"
          : "";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 200ms ease" }}
    >
      <div
        ref={ringRef}
        data-variant={variant}
        className="cc-ring"
      />
      <div ref={dotRef} className="cc-dot" data-variant={variant} />
      {label && (
        <div ref={labelRef} className="cc-label">
          {label}
        </div>
      )}
    </div>
  );
}
