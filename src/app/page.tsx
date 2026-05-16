'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOverlay } from '@/components/LoadingOverlay';

const MAX_LONG_EDGE = 768;
const MAX_OUTPUT_SIZE = 3 * 1024 * 1024;

function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const longEdge = Math.max(img.width, img.height);
      const scale = longEdge > MAX_LONG_EDGE ? MAX_LONG_EDGE / longEdge : 1;
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('canvas context not available'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = outType === 'image/jpeg' ? 0.80 : undefined;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('canvas.toBlob failed'));
            return;
          }
          resolve(blob);
        },
        outType,
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('image load failed'));
    };
    img.src = objectUrl;
  });
}

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Pre-warm the Node.js function instance while the user selects a photo
  useEffect(() => {
    fetch('/api/healthz').catch(() => undefined);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError(null);
    try {
      const blob = await resizeImage(file);
      if (blob.size > MAX_OUTPUT_SIZE) {
        throw new Error('画像が大きすぎます。別の画像でお試しください。');
      }
      const ext = blob.type === 'image/png' ? 'png' : 'jpg';
      const resized = new File([blob], `upload.${ext}`, { type: blob.type });
      const formData = new FormData();
      formData.append('image', resized);

      const res = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? '診断できませんでした。');
      }
      const id = crypto.randomUUID();
      sessionStorage.setItem(`hsm:${id}`, JSON.stringify(data));
      const p = encodeURIComponent(String(data.person ?? ''));
      const m = String(data.matchRate ?? 0);
      router.push(`/result?id=${id}&p=${p}&m=${m}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : '不明なエラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100 flex flex-col items-center justify-center px-6 py-16">
      {previewUrl && <LoadingOverlay previewUrl={previewUrl} active={loading} />}
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-200">
            歴史人物 魂マッチング
          </h1>
          <p className="text-sm text-zinc-400">
            あなたの写真を一枚。<br />
            魂が呼応する歴史上の人物を AI が診断します。
          </p>
        </header>

        <label
          htmlFor="image-input"
          className="w-full aspect-square rounded-2xl border-2 border-dashed border-amber-200/40 hover:border-amber-200/80 transition-colors cursor-pointer flex items-center justify-center bg-zinc-900/50 overflow-hidden"
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="アップロード写真のプレビュー"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center px-6">
              <p className="text-amber-200/80 text-4xl">📷</p>
              <p className="text-zinc-400 text-sm mt-3">タップして写真を選ぶ</p>
              <p className="text-zinc-600 text-xs mt-1">JPEG / PNG / WebP / GIF</p>
            </div>
          )}
        </label>
        <input
          id="image-input"
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={handleFileChange}
          disabled={loading}
        />

        {error && (
          <p
            role="alert"
            className="w-full text-center text-sm text-red-300 bg-red-950/40 border border-red-800/50 rounded-lg px-4 py-3"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!file || loading}
          className="w-full h-14 rounded-full bg-amber-200 text-zinc-950 font-bold text-lg hover:bg-amber-100 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '魂を解析中…' : '診断する'}
        </button>

        <p className="text-xs text-zinc-600 text-center max-w-sm">
          アップロードされた写真は診断のためだけに使用され、サーバーには保存されません。
        </p>
      </div>
    </main>
  );
}
