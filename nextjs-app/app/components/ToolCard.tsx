// app/components/ToolCard.tsx
import Link from 'next/link';
import { Tool, categories } from '@/app/config/tools';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryInfo = categories[tool.category];

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="tool-card group">
        {/* Badge catégorie */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryInfo.color} font-medium`}>
            {categoryInfo.icon} {categoryInfo.name}
          </span>
          {tool.premium && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
              ⭐ Premium
            </span>
          )}
        </div>

        {/* Icône et titre */}
        <div className="text-center mb-4">
          <span className="tool-icon group-hover:scale-110 transition-transform">
            {tool.icon}
          </span>
          <h3 className="tool-name">{tool.name}</h3>
        </div>

        {/* Description */}
        <p className="tool-description">{tool.description}</p>

        {/* Indicateur hover */}
        <div className="mt-4 flex items-center justify-center text-indigo-600 group-hover:text-indigo-700 text-sm font-medium">
          Try →
        </div>
      </div>
    </Link>
  );
}
