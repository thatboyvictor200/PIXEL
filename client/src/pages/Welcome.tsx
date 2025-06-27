import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-yellow-400">
          👋 Welcome to Pixel
        </h1>
        <p className="text-blue-300 max-w-md mx-auto">
          Chat. Share. Connect. Your world, in one app.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl px-6 py-2 text-lg shadow">
            Get Started
          </Button>
          <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-100/10 rounded-2xl px-6 py-2 text-lg">
            Learn More
          </Button>
        </div>
        <Sparkles className="w-10 h-10 text-white animate-pulse mt-8 mx-auto" />
      </motion.div>
    </div>
  );
}
