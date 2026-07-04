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
    "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-accent";

  const styles: Record<Variant, string> = {
    primary:
      "bg-accent hover:bg-accent-bright text-white px-6 py-3 text-sm shadow-ctaGlow hover:shadow-ctaGlowStrong",
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

  if ("to" in props && props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <MotionLink {...hoverLift} to={to} className={classes} {...(rest as any)}>
        {content}
      </MotionLink>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <MotionAnchor {...hoverLift} href={href} className={classes} {...(rest as any)}>
        {content}
      </MotionAnchor>
    );
  }

  return (
    <motion.button {...hoverLift} className={classes} {...(props as any)}>
      {content}
    </motion.button>
  );
}