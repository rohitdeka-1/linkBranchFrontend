import { motion } from "framer-motion";

const shimmerVariant = {
  animate: {
    x: ["-100%", "100%"],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
    <motion.div
      className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-gray-500 to-transparent"
      variants={shimmerVariant}
      animate="animate"
    />
  </div>
);

const SkeletonLoader = () => {
  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
        <SkeletonBox className="h-6 w-3/4 rounded" />
      <SkeletonBox className="h-6 w-3/4 rounded" />
      <SkeletonBox className="h-6 w-3/4 rounded" />
      <SkeletonBox className="h-48 w-full rounded-lg" />

      <SkeletonBox className="h-48 w-full rounded-lg" />
      <SkeletonBox className="h-6 w-3/4 rounded" />

      {/* Subtitle lines */}
      <div className="space-y-2">
        <SkeletonBox className="h-4 w-full rounded" />
        <SkeletonBox className="h-4 w-5/6 rounded" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
