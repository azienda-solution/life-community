// app/tools/[slug]/ToolWrapper.tsx
'use client';

import { toolComponents } from '@/app/tools/registry';

interface ToolWrapperProps {
  slug: string;
}

export default function ToolWrapper({ slug }: ToolWrapperProps) {
  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">⚠️ Composant non trouvé pour : {slug}</p>
      </div>
    );
  }

  // ✅ Le callback est maintenant dans le Client Component
  const handleComplete = (result: unknown) => {
    console.log('✅ Tool completed:', result);
    // Vous pouvez ajouter ici :
    // - Analytics tracking
    // - Notifications toast
    // - Redirection
  };

  return <ToolComponent onComplete={handleComplete} />;
}
