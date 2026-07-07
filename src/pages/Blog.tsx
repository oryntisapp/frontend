import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Cpu, ListChecks, Network, ArrowUpRight, X } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { fadeUp, fadeUpStagger } from "../lib/motionVariants";
import { blogPosts, type BlogPost } from "../data/blogPosts";

const CATEGORY_META: Record<string, { icon: typeof Cpu; color: string }> = {
  Industry: { icon: AlertTriangle, color: "from-warning/30 via-warning/10 to-transparent" },
  Product: { icon: Cpu, color: "from-accent/30 via-accent/10 to-transparent" },
  Playbook: { icon: ListChecks, color: "from-success/30 via-success/10 to-transparent" },
  Engineering: { icon: Network, color: "from-gradient-deep/30 via-gradient-deep/10 to-transparent" },
};

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const meta = CATEGORY_META[post.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-background-base/80 px-4 py-20 backdrop-blur-sm sm:py-28"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard interactive={false} className="relative overflow-visible p-8 sm:p-10">
          <span className="absolute inset-x-0 top-0 z-20 h-[2px] bg-brand-gradient-h" />

          <button
            onClick={onClose}
            aria-label="Close article"
            className="absolute -right-3 -top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-elevated text-foreground-muted shadow-card transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <Badge className="mb-4 w-fit">{post.category}</Badge>

          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {post.title}
          </h2>

          <div className="mt-3 flex items-center gap-3 font-mono text-xs text-foreground-subtle">
            <span>{post.readTime}</span>
            <span className="h-3 w-px bg-border" />
            <span>{post.publishedAt}</span>
          </div>

          <div className="mt-6 space-y-4 border-t border-border pt-6">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export default function Blog() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
        <SectionHeading eyebrow="Blog" headline="Notes on running operations with AI." className="mx-auto max-w-xl text-center" align="center" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUpStagger}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => {
            const meta = CATEGORY_META[post.category];
            return (
              <motion.div key={post.slug} variants={fadeUp}>
                <button onClick={() => setSelected(post)} className="w-full text-left">
                  <GlassCard interactive={true} className="relative flex aspect-[4/3] flex-col overflow-hidden">
                    <span className="absolute inset-x-0 top-0 z-20 h-[2px] bg-brand-gradient-h" />

                    <div className="pointer-events-none absolute -bottom-4 -right-4 z-0 opacity-[0.05]">
                      <meta.icon className="h-40 w-40 text-foreground" strokeWidth={1} />
                    </div>

                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.color} opacity-40`}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-grid opacity-[0.06] mix-blend-overlay" />

                    <div className="relative z-10 flex h-full flex-col p-6">
                      <Badge className="mb-3 w-fit">{post.category}</Badge>

                      <h3 className="text-lg font-semibold tracking-tight text-foreground">{post.title}</h3>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-3 font-mono text-xs text-foreground-subtle">
                          <span>{post.readTime}</span>
                          <span className="h-3 w-px bg-border" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-foreground-subtle opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent-bright group-hover:opacity-100" />
                      </div>
                    </div>
                  </GlassCard>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <BlogModal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
