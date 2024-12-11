'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaCode, FaRocket, FaShare } from 'react-icons/fa';
import { MdEmail, MdWeb, MdQrCode2 } from 'react-icons/md';
import { BiChip } from 'react-icons/bi';
import Image from 'next/image';

interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  bgColor: string;
  delay?: number;
}

const MatrixBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute w-full h-full">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-blue-500/30 text-xs font-mono"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `matrix ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {particle.id % 2 === 0 ? '1' : '0'}
          </div>
        ))}
      </div>
    </div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
        {text}
      </h1>
    );
  }

  return (
    <div className="relative">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
        {text}
      </h1>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="glitch-effect" data-text={text}>
          {text}
        </div>
      </div>
    </div>
  );
};

const TypeWriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, isClient]);

  // Durante a renderização do servidor, retorna o texto completo
  if (!isClient) return <span>{text}</span>;

  return <span>{displayText}</span>;
};

const SocialButton: React.FC<SocialButtonProps> = ({ icon, href, label, bgColor, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center p-4 rounded-xl ${bgColor} text-white transform transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm hover:shadow-xl group overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <motion.div
        animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

const TechIcon: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-gray-300 relative cursor-pointer"
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="text-2xl mb-1"
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <motion.div 
        className="text-xs"
        animate={{ y: isHovered ? -2 : 0 }}
      >
        {text}
      </motion.div>
      {isHovered && (
        <motion.div
          className="absolute -inset-2 rounded-lg bg-white/5 -z-10"
          layoutId="techHighlight"
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

const BackgroundLogo = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <div className="absolute w-full h-full transform rotate-12 scale-150">
        <div className="absolute -top-1/4 -left-1/4 w-150 h-150 animate-float-slow">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain opacity-50"
          />
        </div>
        <div className="absolute -bottom-1/4 -right-1/4 w-150 h-150 animate-float-slow-reverse">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

const ContactCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const CARD_URL = "https://github.com/dgsolutionweb/meucard.git";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DGSolutionWEB',
          text: 'Especialistas em Criação e Desenvolvimento Web',
          url: CARD_URL,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixBackground />
      <BackgroundLogo />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)`
            : 'none',
          transition: 'transform 0.3s ease'
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative text-center z-10"
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <Image
                  src="/logo.png"
                  alt="DGSolutionWEB Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          <GlitchText text="DGSolutionWEB" />
          
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4 }}
          />

          <motion.div 
            className="grid grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TechIcon icon={<BiChip />} text="Inovação" />
            <TechIcon icon={<FaCode />} text="Web Dev" />
            <TechIcon icon={<MdWeb />} text="Design" />
            <TechIcon icon={<FaRocket />} text="Performance" />
          </motion.div>

          <motion.p 
            className="text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypeWriter text="Especialistas em Criação e Desenvolvimento Web" />
            <br />
            <span className="text-blue-400">
              <TypeWriter text="Cartões de Visita Digitais Personalizados" />
            </span>
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton
              icon={<FaWhatsapp className="text-2xl" />}
              href="https://wa.me/5517999754390"
              label="Contato WhatsApp"
              bgColor="bg-green-500/80 hover:bg-green-500"
              delay={0.7}
            />
            
            <SocialButton
              icon={<FaFacebookF className="text-2xl" />}
              href="https://www.facebook.com/profile.php?id=61568347394059"
              label="Perfil Facebook"
              bgColor="bg-blue-600/80 hover:bg-blue-600"
              delay={0.8}
            />
            
            <SocialButton
              icon={<FaInstagram className="text-2xl" />}
              href="https://instagram.com/dgsolutionweb"
              label="Perfil Instagram"
              bgColor="bg-pink-600/80 hover:bg-pink-600"
              delay={0.9}
            />
            
            <SocialButton
              icon={<MdEmail className="text-2xl" />}
              href="mailto:dgsolutionweb@gmail.com"
              label="Enviar Email"
              bgColor="bg-red-500/80 hover:bg-red-500"
              delay={1}
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={() => setShowQR(!showQR)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdQrCode2 className="text-xl" />
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShare className="text-xl" />
            </motion.button>
          </div>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(CARD_URL)}`}
                    alt="QR Code para DGSolutionWEB"
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Escaneie para acessar nosso cartão digital
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="mt-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-sm text-gray-300">
              <TypeWriter text="Transformando sua presença digital com soluções web inovadoras e personalizadas." />
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactCard; 