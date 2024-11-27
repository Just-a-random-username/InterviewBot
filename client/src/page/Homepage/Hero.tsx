import React from "react";
import { motion } from "framer-motion";
import { FileText, Bot, Zap, Target, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            AI-Powered <br />
            Interview Intelligence
          </h1>
          <p className="text-xl text-gray-300 max-w-xl">
            Transform your hiring process with advanced AI that analyzes
            resumes, conducts intelligent interviews, and provides deep
            candidate insights.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            <button className="border border-white/30 hover:border-white text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 bg-white/10">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/07/Building-a-Contextual-Chatbot-with-GPT4o_-Maintaining-Conversation-History-1-scaled.webp"
            alt="AI Interview Dashboard"
            className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Revolutionize your recruitment with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FileText,
              color: "text-blue-400",
              title: "Resume Analysis",
              description: "Advanced AI screening of candidate resumes",
            },
            {
              icon: Bot,
              color: "text-green-400",
              title: "AI Interviews",
              description: "Intelligent, automated interview process",
            },
            {
              icon: Zap,
              color: "text-purple-400",
              title: "Quick Insights",
              description: "Instant candidate potential evaluation",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20 hover:border-blue-500 transition-all duration-300"
            >
              <feature.icon
                className={`mx-auto mb-4 ${feature.color}`}
                size={48}
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Our AI Interview Bot?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Target, text: "Precision candidate matching" },
                {
                  icon: CheckCircle,
                  text: "Objective and unbiased evaluation",
                },
                { icon: Zap, text: "Reduce hiring time by 70%" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <benefit.icon className="text-blue-400" size={30} />
                  <p className="text-lg text-gray-300">{benefit.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://img.freepik.com/premium-photo/ai-stealing-our-jobs-ai-job-interview-generative-ai_877869-760.jpg"
              alt="AI Interview Process"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your AI-powered recruitment journey today
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
