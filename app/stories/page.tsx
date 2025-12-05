'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StoryCard from '@/components/molecules/StoryCard';
import Badge from '@/components/atoms/Badge';
import Divider from '@/components/atoms/Divider';
import PageTransition from '@/components/animations/PageTransition';
import { stories } from '@/data/stories';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<(typeof stories)[0] | null>(null);

  if (selectedStory) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedStory(null)}
              >
                ← Back to Stories
              </Button>
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Card padding="xl">
                {/* Header */}
                <div className="mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-7xl mb-6"
                  >
                    {selectedStory.icon}
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-heading">
                    {selectedStory.title}
                  </h1>
                  <Badge variant="warning" size="lg">
                    {selectedStory.category}
                  </Badge>
                </div>

                <Divider color="light" margin="lg" />

                {/* Story Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-lg max-w-none mb-12"
                >
                  <p className="text-navy/80 leading-relaxed whitespace-pre-line text-base md:text-lg">
                    {selectedStory.story}
                  </p>
                </motion.div>

                <Divider color="light" margin="lg" />

                {/* What Went Wrong */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <div className="bg-red-100/40 border-l-4 border-red-500 p-6 rounded-lg mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-red-700 mb-4">
                      What Went Wrong
                    </h3>
                    <ul className="space-y-3">
                      {selectedStory.whatWentWrong.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-start gap-3 text-navy/80"
                        >
                          <span className="text-xl mt-1">❌</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* How to Avoid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <div className="bg-money-green/15 border-l-4 border-money-green p-6 rounded-lg mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-money-green mb-4">
                      How to Avoid This
                    </h3>
                    <ul className="space-y-3">
                      {selectedStory.howToAvoid.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex items-start gap-3 text-navy/80"
                        >
                          <span className="text-xl mt-1">✅</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Key Rule */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-accent-yellow/30 to-accent-yellow/20 border-2 border-accent-yellow/50 p-8 rounded-xl"
                >
                  <p className="text-lg md:text-xl font-bold text-navy leading-relaxed">
                    {selectedStory.keyRule}
                  </p>
                </motion.div>
              </Card>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <Button
                  onClick={() => setSelectedStory(null)}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Read Another Story
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-3 font-heading">
              Real Financial Stories
            </h1>
            <p className="text-lg text-navy/60 font-medium max-w-2xl">
              Learn from real people's financial mistakes. Every story comes with lessons to help you avoid the same pitfalls.
            </p>
          </motion.div>

          {/* Stories Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {stories.map((story) => (
              <motion.div key={story.id} variants={fadeInUp}>
                <div onClick={() => setSelectedStory(story)} className="h-full">
                  <StoryCard
                    title={story.title}
                    category={story.category}
                    preview={story.story.substring(0, 150) + '...'}
                    lesson={story.keyRule}
                    onClick={() => setSelectedStory(story)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
