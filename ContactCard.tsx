import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  bgColor: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, href, label, bgColor }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center p-4 rounded-lg ${bgColor} text-white transform transition-all duration-300 hover:scale-105 shadow-lg`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
};

const ContactCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Image
                src="/logo.png"
                alt="DGSolutionWEB Logo"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            DGSolutionWEB
          </motion.h1>
          
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4 }}
          />

          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Especialistas em Criação e Desenvolvimento Web
            <br />
            Cartões de Visita Digitais Personalizados
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton
              icon={<FaWhatsapp className="text-2xl" />}
              href="https://wa.me/5511999999999"
              label="Contato WhatsApp"
              bgColor="bg-green-500 hover:bg-green-600"
            />
            
            <SocialButton
              icon={<FaFacebookF className="text-2xl" />}
              href="https://facebook.com/dgsolutionweb"
              label="Perfil Facebook"
              bgColor="bg-blue-600 hover:bg-blue-700"
            />
            
            <SocialButton
              icon={<FaInstagram className="text-2xl" />}
              href="https://instagram.com/dgsolutionweb"
              label="Perfil Instagram"
              bgColor="bg-pink-600 hover:bg-pink-700"
            />
            
            <SocialButton
              icon={<MdEmail className="text-2xl" />}
              href="mailto:contato@dgsolutionweb.com"
              label="Enviar Email"
              bgColor="bg-red-500 hover:bg-red-600"
            />
          </div>

          <motion.div
            className="mt-8 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-500">
              Transformando sua presença digital com soluções web inovadoras e personalizadas.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactCard; 