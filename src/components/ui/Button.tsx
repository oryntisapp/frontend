import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { hoverLift } from "../../lib/motionVariants";

type Variant = "primary" | "ghost" | "large";

const MotionLink = motion(Link);
const MotionAnchor = motion.a;

interface BaseProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

// `to` -> internal route (react-router Link). `href` -> real external/anchor link.
// Neither present -> plain button, for onClick-driven actions (forms, toggles, etc).
type ButtonProps = BaseProps &
  (
    | ({ to: LinkProps["to"]; href?: undefined } & Omit<LinkProps, "to" | "className" | "children">)
    | ({ href: string; to?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ to?: undefined; href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

export default function Button({ variant = "primary", icon, children, className = "", ...props }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus-visible:outline-accent";

  const styles: Record<Variant, string> = {
    primary:
      "bg-brand-gradient text-white px-6 py-3 text-sm shadow-ctaGlow border border-accent/25",
    large:
      "bg-accent hover:bg-accent-bright text-white px-9 py-4 text-base shadow-ctaGlowStrong",
    ghost:
      "bg-transparent border border-border hover:border-border-hover text-foreground px-6 py-3 text-sm hover:bg-surface",
  };

  const content = (
    <>
      {children}
      {icon && (
        <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  const classes = `${base} ${styles[variant]} ${className}`;

  const primaryHover = variant === "primary"
    ? {
        whileHover: {
          y: -6,
          scale: 1.03,
          boxShadow: "0 8px 40px -6px rgba(177,62,217,0.7), 0 0 0 1px rgba(225,108,241,0.5) inset",
          borderColor: "rgba(225,108,241,0.5)",
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        },
        whileTap: { scale: 0.97 },
      }
    : hoverLift;

  if ("to" in props && props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <MotionLink {...primaryHover} to={to} className={classes} {...(rest as any)}>
        {content}
      </MotionLink>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <MotionAnchor {...primaryHover} href={href} className={classes} {...(rest as any)}>
        {content}
      </MotionAnchor>
    );
  }

  return (
    <motion.button {...primaryHover} className={classes} {...(props as any)}>
      {content}
    </motion.button>
  );
}