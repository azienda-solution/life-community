// app/landing/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            🚀 Life Community Tools
          </h1>
          <p className="text-2xl mb-8 opacity-90">
            55+ outils gratuits pour simplifier votre quotidien
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Découvrir les outils
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            ✨ Pourquoi choisir nos outils ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">100% Sécurisé</h3>
              <p className="text-gray-600">
                Vos fichiers sont traités localement. Aucune donnée n'est envoyée sur nos serveurs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Ultra Rapide</h3>
              <p className="text-gray-600">
                Conversion instantanée sans temps d'attente. Profitez d'outils optimisés.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Gratuit</h3>
              <p className="text-gray-600">
                Accès illimité à tous nos outils sans inscription ni frais cachés.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            🛠️ 5 Catégories d'outils
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            
            <Link href="/?category=pdf" className="group">
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📄</div>
                <h3 className="font-bold text-gray-800">PDF</h3>
                <p className="text-sm text-gray-500 mt-2">18 outils</p>
              </div>
            </Link>

            <Link href="/?category=image" className="group">
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🖼️</div>
                <h3 className="font-bold text-gray-800">Images</h3>
                <p className="text-sm text-gray-500 mt-2">10 outils</p>
              </div>
            </Link>

            <Link href="/?category=media" className="group">
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🎬</div>
                <h3 className="font-bold text-gray-800">Média</h3>
                <p className="text-sm text-gray-500 mt-2">10 outils</p>
              </div>
            </Link>

            <Link href="/?category=data" className="group">
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🧩</div>
                <h3 className="font-bold text-gray-800">Données</h3>
                <p className="text-sm text-gray-500 mt-2">12 outils</p>
              </div>
            </Link>

            <Link href="/?category=security" className="group">
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🔎</div>
                <h3 className="font-bold text-gray-800">Sécurité</h3>
                <p className="text-sm text-gray-500 mt-2">5 outils</p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui utilisent nos outils chaque jour
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
          >
            Accéder aux outils gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 Life Community Tools - Tous droits réservés</p>
          <div className="flex gap-6 justify-center">
            <Link href="/about" className="hover:text-white transition-colors">À propos</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export const metadata = {
  title: 'Life Community Tools - 55+ outils gratuits en ligne',
  description: 'Convertissez, compressez, éditez vos fichiers PDF, images et vidéos gratuitement avec nos 55+ outils en ligne.',
};
