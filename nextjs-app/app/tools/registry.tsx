// app/tools/registry.tsx
'use client';

import { useState } from 'react';

// ==================== TYPES ====================
export interface ToolComponentProps {
  onComplete?: (result: unknown) => void;
}

// ==================== PDF TOOLS ====================

export function PdfToWord({ onComplete }: ToolComponentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete?.({ success: true });
    }, 2000);
  };

  return (
    <div className="tool-interface">
      <div className="upload-zone">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="pdf-word-input"
        />
        <label htmlFor="pdf-word-input" className="cursor-pointer">
          <div className="text-center">
            <span className="text-6xl block mb-4">📄</span>
            <p className="text-gray-600 mb-2">
              {file ? file.name : 'Cliquez ou glissez votre PDF'}
            </p>
          </div>
        </label>
      </div>
      {file && (
        <button onClick={handleConvert} disabled={loading} className="btn-primary mt-4">
          {loading ? 'Conversion...' : 'Convertir en Word'}
        </button>
      )}
    </div>
  );
}

export function PdfToExcel({ onComplete }: ToolComponentProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="tool-interface">
      <div className="upload-zone">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="pdf-excel-input"
        />
        <label htmlFor="pdf-excel-input" className="cursor-pointer">
          <span className="text-6xl block mb-4">📊</span>
          <p className="text-gray-600">
            {file ? file.name : 'Déposez votre PDF avec tableaux'}
          </p>
        </label>
      </div>
      {file && (
        <button className="btn-primary mt-4" onClick={() => onComplete?.({ file })}>
          Extraire vers Excel
        </button>
      )}
    </div>
  );
}

export function PdfToPpt({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📽️" name="PDF → PowerPoint" onComplete={onComplete} />;
}

export function ImagesToPdf({ onComplete }: ToolComponentProps) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="tool-interface">
      <div className="upload-zone">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="hidden"
          id="images-pdf-input"
        />
        <label htmlFor="images-pdf-input" className="cursor-pointer">
          <span className="text-6xl block mb-4">🖼️</span>
          <p className="text-gray-600">
            {files.length > 0 
              ? `${files.length} image(s) sélectionnée(s)` 
              : 'Sélectionnez plusieurs images'}
          </p>
        </label>
      </div>
      {files.length > 0 && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-4 gap-2">
            {files.map((f, i) => (
              <div key={i} className="text-xs text-gray-500 truncate">{f.name}</div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => onComplete?.({ files })}>
            Créer PDF
          </button>
        </div>
      )}
    </div>
  );
}

export function ExtractImages({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎨" name="Extraire images du PDF" onComplete={onComplete} />;
}

export function ReorderPages({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔄" name="Réorganiser les pages" onComplete={onComplete} />;
}

export function CropPages({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Recadrer les pages" onComplete={onComplete} />;
}

export function ProtectPdf({ onComplete }: ToolComponentProps) {
  const [password, setPassword] = useState('');

  return (
    <div className="tool-interface space-y-4">
      <div className="upload-zone">
        <span className="text-6xl block mb-4">🔒</span>
        <p className="text-gray-600 mb-4">Protégez votre PDF</p>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field w-full px-4 py-2 border rounded"
        />
        <button 
          className="btn-primary mt-4" 
          onClick={() => onComplete?.({ password })}
        >
          Protéger
        </button>
      </div>
    </div>
  );
}

export function UnlockPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔓" name="Déverrouiller PDF" onComplete={onComplete} />;
}

export function WatermarkPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="💧" name="Ajouter un filigrane" onComplete={onComplete} />;
}

export function FillForms({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📝" name="Remplir formulaires" onComplete={onComplete} />;
}

export function SignPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✍️" name="Signer PDF" onComplete={onComplete} />;
}

export function CompressPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🗜️" name="Compresser PDF" onComplete={onComplete} />;
}

export function MergePdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔗" name="Fusionner PDFs" onComplete={onComplete} />;
}

export function SplitPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Diviser PDF" onComplete={onComplete} />;
}

export function RotatePdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔄" name="Pivoter PDF" onComplete={onComplete} />;
}

export function PdfToJpg({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🖼️" name="PDF → JPG" onComplete={onComplete} />;
}

export function RepairPdf({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔧" name="Réparer PDF" onComplete={onComplete} />;
}

// ==================== IMAGE TOOLS ====================

export function ResizeBatch({ onComplete }: ToolComponentProps) {
  const presets = ['Instagram (1080x1080)', 'Facebook (1200x630)', 'Twitter (1200x675)'];

  return (
    <div className="tool-interface">
      <div className="upload-zone mb-4">
        <span className="text-6xl block mb-4">📐</span>
        <p className="text-gray-600">Redimensionner plusieurs images</p>
      </div>
      <div className="space-y-2">
        {presets.map(preset => (
          <button 
            key={preset} 
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
            onClick={() => onComplete?.({ preset })}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CompressImages({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🗜️" name="Compresser images" onComplete={onComplete} />;
}

export function ConvertFormats({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔄" name="Convertir formats" onComplete={onComplete} />;
}

export function RemoveBg({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎭" name="Supprimer arrière-plan" onComplete={onComplete} />;
}

export function AddWatermark({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="💧" name="Ajouter filigrane" onComplete={onComplete} />;
}

export function CropTool({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Recadrer image" onComplete={onComplete} />;
}

export function Filters({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎨" name="Filtres et effets" onComplete={onComplete} />;
}

export function FaceBlur({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="😶‍🌫️" name="Flouter visages" onComplete={onComplete} />;
}

export function Upscale({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📈" name="Améliorer qualité" onComplete={onComplete} />;
}

export function MemeGenerator({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="😂" name="Générateur de memes" onComplete={onComplete} />;
}

// ==================== MEDIA TOOLS ====================

export function VideoCompress({ onComplete }: ToolComponentProps) {
  const [targetSize, setTargetSize] = useState(10);

  return (
    <div className="tool-interface">
      <div className="upload-zone mb-4">
        <span className="text-6xl block mb-4">🗜️</span>
        <p className="text-gray-600">Compresser à taille cible</p>
      </div>
      <label className="block mb-4">
        <span className="text-gray-700">Taille cible: {targetSize} MB</span>
        <input
          type="number"
          value={targetSize}
          onChange={(e) => setTargetSize(Number(e.target.value))}
          className="input-field w-full px-4 py-2 border rounded mt-2"
        />
      </label>
      <button className="btn-primary" onClick={() => onComplete?.({ targetSize })}>
        Compresser
      </button>
    </div>
  );
}

export function VideoConvert({ onComplete }: ToolComponentProps) {
  const formats = ['MP4 (H.264)', 'MP4 (H.265)', 'WebM'];

  return (
    <div className="tool-interface">
      <div className="upload-zone mb-4">
        <span className="text-6xl block mb-4">🎥</span>
        <p className="text-gray-600">Convertir vidéo</p>
      </div>
      <select className="w-full px-4 py-2 border rounded mb-4">
        {formats.map(f => <option key={f}>{f}</option>)}
      </select>
      <button className="btn-primary" onClick={() => onComplete?.({})}>
        Convertir
      </button>
    </div>
  );
}

// components/ExtractAudio.tsx
// nextjs-app/app/tools/registry.tsx
export function ExtractAudio({ onComplete }: ToolComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/extract-audio`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de l'extraction");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audio.mp3";
      a.click();

      onComplete?.("audio.mp3");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎵 Extraire audio</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            name="video"
            accept="video/*"
            required
            disabled={loading}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "⏳ Extraction en cours..." : "🎵 Extraire l'audio"}
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-blue-600 font-medium">⏳ Veuillez patienter...</p>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ {error}
        </div>
      )}
    </div>
  );
}


export function TrimVideo({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Découper vidéo" onComplete={onComplete} />;
}

export function GifMaker({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎞️" name="Créer GIF" onComplete={onComplete} />;
}

export function AudioConverter({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔊" name="Convertir audio" onComplete={onComplete} />;
}

export function AudioTrim({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Découper audio" onComplete={onComplete} />;
}

export function MergeAudio({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔗" name="Fusionner audio" onComplete={onComplete} />;
}

export function ChangePitch({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎚️" name="Changer tonalité" onComplete={onComplete} />;
}

export function NoiseReducer({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔇" name="Réduire bruit" onComplete={onComplete} />;
}

// ==================== DATA TOOLS ====================

export function CsvToJson({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📊" name="CSV → JSON" onComplete={onComplete} />;
}

export function JsonFormatter({ onComplete }: ToolComponentProps) {
  const [input, setInput] = useState('');

  return (
    <div className="tool-interface">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"example": "json"}'
        className="w-full h-64 p-4 border rounded font-mono text-sm"
      />
      <div className="flex gap-2 mt-4">
        <button className="btn-secondary" onClick={() => onComplete?.({ format: 'yaml' })}>
          → YAML
        </button>
        <button className="btn-secondary" onClick={() => onComplete?.({ format: 'xml' })}>
          → XML
        </button>
      </div>
    </div>
  );
}

export function ExcelSplit({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📑" name="Diviser Excel" onComplete={onComplete} />;
}

export function DataValidator({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✅" name="Valider données" onComplete={onComplete} />;
}

export function Base64Tool({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔤" name="Base64 Encoder/Decoder" onComplete={onComplete} />;
}

export function QrCode({ onComplete }: ToolComponentProps) {
  const [text, setText] = useState('');

  return (
    <div className="tool-interface">
      <div className="text-center mb-4">
        <span className="text-6xl block mb-4">📱</span>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="URL ou texte"
        className="input-field w-full px-4 py-2 border rounded mb-4"
      />
      <button className="btn-primary" onClick={() => onComplete?.({ text })}>
        Générer QR Code
      </button>
    </div>
  );
}

export function BarcodeGen({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📊" name="Générateur code-barres" onComplete={onComplete} />;
}

export function ColorPicker({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🎨" name="Sélecteur de couleur" onComplete={onComplete} />;
}

export function UnitConverter({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="⚖️" name="Convertisseur d'unités" onComplete={onComplete} />;
}

export function TextDiff({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="📝" name="Comparer texte" onComplete={onComplete} />;
}

// ==================== SECURITY TOOLS ====================

export function OcrScanner({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="👁️" name="OCR Scanner" onComplete={onComplete} />;
}

export function HashGenerator({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔐" name="Générateur de hash" onComplete={onComplete} />;
}

export function PasswordGen({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔑" name="Générateur mot de passe" onComplete={onComplete} />;
}

export function EncryptText({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="🔒" name="Chiffrer texte" onComplete={onComplete} />;
}

export function SplitMerge({ onComplete }: ToolComponentProps) {
  return <ToolTemplate icon="✂️" name="Découper fichiers" onComplete={onComplete} />;
}

// ==================== TEMPLATE COMPONENT ====================

function ToolTemplate({ 
  icon, 
  name, 
  onComplete 
}: { 
  icon: string; 
  name: string; 
  onComplete?: (result: unknown) => void;
}) {
  return (
    <div className="tool-interface">
      <div className="upload-zone">
        <span className="text-6xl block mb-4">{icon}</span>
        <p className="text-gray-600 mb-4">{name}</p>
        <button className="btn-primary" onClick={() => onComplete?.({})}>
          Commencer
        </button>
      </div>
    </div>
  );
}

// ==================== REGISTRY MAP ====================

export const toolComponents: Record<string, React.ComponentType<ToolComponentProps>> = {
  // PDF (18 outils)
  'pdf-to-word': PdfToWord,
  'pdf-to-excel': PdfToExcel,
  'pdf-to-ppt': PdfToPpt,
  'images-to-pdf': ImagesToPdf,
  'extract-images': ExtractImages,
  'reorder-pages': ReorderPages,
  'crop-pages': CropPages,
  'protect-pdf': ProtectPdf,
  'unlock-pdf': UnlockPdf,
  'watermark-pdf': WatermarkPdf,
  'fill-forms': FillForms,
  'sign-pdf': SignPdf,
  'compress-pdf': CompressPdf,
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'rotate-pdf': RotatePdf,
  'pdf-to-jpg': PdfToJpg,
  'repair-pdf': RepairPdf,

  // Image (10 outils)
  'resize-batch': ResizeBatch,
  'compress-images': CompressImages,
  'convert-formats': ConvertFormats,
  'remove-bg': RemoveBg,
  'add-watermark': AddWatermark,
  'crop-tool': CropTool,
  'filters': Filters,
  'face-blur': FaceBlur,
  'upscale': Upscale,
  'meme-generator': MemeGenerator,

  // Media (10 outils)
  'video-compress': VideoCompress,
  'video-convert': VideoConvert,
  'extract-audio': ExtractAudio,
  'trim-video': TrimVideo,
  'gif-maker': GifMaker,
  'audio-converter': AudioConverter,
  'audio-trim': AudioTrim,
  'merge-audio': MergeAudio,
  'change-pitch': ChangePitch,
  'noise-reducer': NoiseReducer,

  // Data (12 outils)
  'csv-to-json': CsvToJson,
  'json-formatter': JsonFormatter,
  'excel-split': ExcelSplit,
  'data-validator': DataValidator,
  'base64-tool': Base64Tool,
  'qr-code': QrCode,
  'barcode-gen': BarcodeGen,
  'color-picker': ColorPicker,
  'unit-converter': UnitConverter,
  'text-diff': TextDiff,

  // Security (5 outils)
  'ocr-scanner': OcrScanner,
  'hash-generator': HashGenerator,
  'password-gen': PasswordGen,
  'encrypt-text': EncryptText,
  'split-merge': SplitMerge,
};
