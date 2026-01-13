// app/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { tools, categories } from '@/app/config/tools';
import ToolCard from '@/app/components/ToolCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse-slow" />
        
        <div className="container mx-auto px-4 pt-20 pb-16 relative">
          {/* Title avec animation */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Life Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-up-delay-1">
              Votre suite d&apos;outils tout-en-un 🚀
            </p>
          </div>

          {/* CTA Buttons avec hover animation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up-delay-2">
            <Link 
              href="/login" 
              className="btn-primary hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <span>Se connecter</span>
              <span className="ml-2">→</span>
            </Link>
            <Link 
              href="/register" 
              className="btn-secondary hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Features Cards avec stagger animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <FeatureCard 
              icon="🛠️" 
              title="55+ Outils" 
              description="PDF, Images, Vidéo..."
              delay="0"
            />
            <FeatureCard 
              icon="⚡" 
              title="100% Gratuit" 
              description="Traitement local"
              delay="100"
            />
            <FeatureCard 
              icon="🔒" 
              title="Privé & Sécurisé" 
              description="Aucun upload cloud"
              delay="200"
            />
          </div>
        </div>
      </header>

      {/* Tools Section */}
      <section className="container mx-auto px-4 pb-20 m-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explorez nos outils
          </h2>
          <p className="text-lg text-gray-600">
            Sélectionnez une catégorie pour commencer
          </p>
        </div>

        {/* Category Filter avec animation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <CategoryButton
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            icon="🌟"
            label="Tous"
            count={tools.length}
          />
          {Object.entries(categories).map(([key, cat]) => (
            <CategoryButton
              key={key}
              active={selectedCategory === key}
              onClick={() => setSelectedCategory(key)}
              icon={cat.icon}
              label={cat.name}
              count={tools.filter(t => t.category === key).length}
            />
          ))}
        </div>

        {/* Tools Grid avec fade-in animation */}
        <div className="tools-grid">
          {filteredTools.map((tool, index) => (
            <div 
              key={tool.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-xl text-gray-500">Aucun outil dans cette catégorie</p>
          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Life Community • Made with ❤️
          </p>
        </div>
      </footer>

    </div>
  );
}

// ==================== COMPONENTS ====================

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: string; 
  title: string; 
  description: string;
  delay: string;
}) {
  return (
    <div 
      className="feature-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="feature-icon text-5xl mb-3 block animate-bounce-slow">
        {icon}
      </span>
      <h3 className="feature-title text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function CategoryButton({ 
  active, 
  onClick, 
  icon, 
  label, 
  count 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: string; 
  label: string; 
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full font-medium transition-all duration-300
        flex items-center gap-2 hover:scale-105
        ${active 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      <span className={`
        text-xs px-2 py-0.5 rounded-full
        ${active ? 'bg-white/20' : 'bg-gray-200'}
      `}>
        {count}
      </span>
    </button>
  );
}
