import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const personRaw = searchParams.get('person') ?? '?';
  const person = personRaw.slice(0, 30);
  const rateRaw = Number.parseInt(searchParams.get('matchRate') ?? '', 10);
  const matchRate =
    Number.isFinite(rateRaw) && rateRaw >= 0 && rateRaw <= 100 ? rateRaw : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(180deg, #09090b 0%, #18181b 50%, #000000 100%)',
          color: '#fde68a',
          fontFamily: 'sans-serif',
          padding: 60,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.7,
            letterSpacing: 12,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Soul Match
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginTop: 24,
            color: '#fef3c7',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {person}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#a1a1aa',
            marginTop: 24,
            display: 'flex',
          }}
        >
          と
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginTop: 8,
            color: '#fde68a',
          }}
        >
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 1 }}>
            {matchRate}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, marginLeft: 8 }}>%</div>
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#a1a1aa',
            marginTop: 8,
            display: 'flex',
          }}
        >
          一致
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 22,
            color: '#71717a',
            display: 'flex',
          }}
        >
          歴史人物 魂マッチング
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
