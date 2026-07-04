import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";
import type { NavLink } from "./Navbar";

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col bg-background-base/95 pt-24 backdrop-blur-xl md:hidden"
        >
          <motion.ul
            variants={fadeUpStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <motion.li key={link.label} variants={fadeUp}>
                {link.route ? (
                  <Link to={link.href} onClick={onClose} className="text-3xl font-medium text-foreground">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} onClick={onClose} className="text-3xl font-medium text-foreground">
                    {link.label}
                  </a>
                )}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="px-6 pb-10">
            <Button variant="primary" to={primaryCTARoute} className="w-full" onClick={onClose}>
              {primaryCTA}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}