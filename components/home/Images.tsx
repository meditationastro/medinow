'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

const images = [
  {
    src: '/img/home-1.jpg',
    alt: 'Panch Samvay',
  },
  {
    src: '/img/home-2.jpg',
    alt: 'Spirituality and Meditation',
  },
  {
    src: '/img/home-3.jpg',
    alt: 'Ayurveda',
  },
  {
    src: '/img/home-4.jpg',
    alt: 'Yoga',
  }
];

export const Images = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Through the lens of my life
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.alt}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-medium">{image.alt}</p>
                    <p className="text-xs font-light">Click to view</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl w-full h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 text-white hover:text-primary-600 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-8 h-8" />
                </button>
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.alt}</h3>
                  
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}; 