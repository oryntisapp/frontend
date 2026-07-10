import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "ghost" | "large";

const MotionLink = motion(Link);
const MotionAnchor = motion.a;

interface BaseProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | ({ to: LinkProps["to"]; href?: undefined } & Omit<LinkProps, "to" | "className" | "children">)
    | ({ href: string; to?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ to?: undefined; href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium isolate overflow-hidden transition-[border-color,box-shadow] duration-300 ease-in-out focus-visible:outline-accent";

const STYLES: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white px-6 py-3 text-sm border-0 shadow-[0_0_0_1px_rgba(225,108,241,0.2)_inset,0_4px_20px_-6px_rgba(177,62,217,0.4)]",
  large:
    "bg-accent text-white px-9 py-4 text-base border-0 shadow-[0_0_0_1px_rgba(225,108,241,0.2)_inset,0_6px_24px_-6px_rgba(177,62,217,0.45)]",
  ghost:
    "bg-transparent text-foreground px-6 py-3 text-sm border border-border/40",
};

const HOVER_PROPS: Record<Variant, object> = {
  primary: {
    whileHover: {
      y: -2,
      boxShadow:
        "0 0 0 1px rgba(225,108,241,0.35) inset, 0 12px 32px -8px rgba(177,62,217,0.5), 0 0 24px -8px rgba(225,108,241,0.15)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    whileTap: { scale: 0.97, y: 0 },
  },
  large: {
    whileHover: {
      y: -2,
      boxShadow:
        "0 0 0 1px rgba(225,108,241,0.35) inset, 0 16px 40px -8px rgba(177,62,217,0.55), 0 0 28px -8px rgba(225,108,241,0.2)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    whileTap: { scale: 0.97, y: 0 },
  },
  ghost: {
    whileHover: {
      y: -2,
      borderColor: "rgba(225,108,241,0.35)",
      boxShadow: "0 0 0 1px rgba(225,108,241,0.08) inset, 0 8px 24px -10px rgba(177,62,217,0.3)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    whileTap: { scale: 0.97, y: 0 },
  },
};

function Sheen({ variant }: { variant: Variant }) {
  if (variant === "ghost") {
    return (
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[-60%] w-1/3 -skew-x-[20deg] bg-white/20 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
    />
  );
}

export default function Button({ variant = "primary", icon, children, className = "", ...props }: ButtonProps) {
  const primaryTextShadow = variant === "primary" || variant === "large" ? "0 1px 8px rgba(0,0,0,0.3)" : undefined;

  const content = (
    <>
      <Sheen variant={variant} />
      <span
        className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
        style={primaryTextShadow ? { textShadow: primaryTextShadow } : undefined}
      >
        {children}
        {icon && (
          <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">{icon}</span>
        )}
      </span>
    </>
  );

  const classes = `${BASE} ${STYLES[variant]} ${className}`;
  const hoverProps = HOVER_PROPS[variant];

  if ("to" in props && props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <MotionLink {...hoverProps} to={to} className={classes} {...(rest as any)}>
        {content}
      </MotionLink>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <MotionAnchor {...hoverProps} href={href} className={classes} {...(rest as any)}>
        {content}
      </MotionAnchor>
    );
  }

  return (
    <motion.button {...hoverProps} className={classes} {...(props as any)}>
      {content}
    </motion.button>
  );
}
