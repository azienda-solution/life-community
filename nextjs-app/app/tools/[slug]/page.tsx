// app/tools/[slug]/page.tsx
import { tools } from '@/app/config/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ToolWrapper from './ToolWrapper';

export default async function ToolPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const tool = tools.find(t => t.id === slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium">Retour aux outils</span>
        </Link>

        {/* Tool Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <span className="text-6xl">{tool.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600">
                {tool.description}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {tool.category}
                </span>
                {tool.premium && (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    ⭐ Premium
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tool Component - ✅ Plus de props fonction */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <ToolWrapper slug={slug} />
        </div>

        {/* Related Tools */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            🔗 Outils similaires
          </h3>
          <div className="flex gap-3 flex-wrap">
            {tools
              .filter(t => t.category === tool.category && t.id !== slug)
              .slice(0, 4)
              .map(relatedTool => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.id}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors"
                >
                  {relatedTool.icon} {relatedTool.name}
                </Link>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.id }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const tool = tools.find(t => t.id === slug);

  if (!tool) {
    return { title: 'Outil non trouvé' };
  }

  return {
    title: `${tool.name} - Life Community Tools`,
    description: tool.description,
  };
}
