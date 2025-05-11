import { motion } from 'framer-motion';

export default function AnimatedPlaneBanner() {
  return (
    <div className="relative w-full h-24 overflow-hidden mb-6">
      <motion.div
        className="absolute flex items-center gap-2"
        style={{ top: '50%', y: '-50%' }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-gray-900 px-4 py-2 rounded-md shadow-lg flex items-center relative"
          initial={{ scale: 0.95, opacity: 0.85 }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [1, 0.9, 1],
            boxShadow: [
              "0px 0px 10px 0px rgba(254,136,174,0.6)",
              "0px 0px 20px 3px rgba(255,0,160,0.7)",
              "0px 0px 10px 0px rgba(254,136,174,0.6)",
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="font-semibold text-lg tracking-normal">
            <span className="font-serif">FLASH SALE!  </span>
            Up to <strong className="text-white text-xl">70%</strong> off
          </span>
          <motion.span
            className="ml-1.5 text-xl"
            animate={{
              rotate: [0, 20, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          >
            🎉
          </motion.span>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 transform"
            style={{ marginRight: '-9px' }}
          >
            <div className="w-0 h-0
              border-t-[10px] border-t-transparent
              border-b-[10px] border-b-transparent
              border-l-[10px] border-l-purple-500"
            ></div>
          </div>
        </motion.div>
        <span
          className="text-4xl rotate-45"
        >
          ✈️
        </span>
      </motion.div>
    </div>
  );
}
