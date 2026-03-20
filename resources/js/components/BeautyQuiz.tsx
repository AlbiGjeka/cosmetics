import { useState, useEffect, useCallback } from 'react';
import { useLuxuryTheme } from '@/hooks/use-luxury-theme';

const GOLD_STATIC = '#C9A84C'; // used in Confetti (no hook access)

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    is_featured: boolean;
}

interface Category {
    id: number;
    name: string;
    products: Product[];
}

interface Props {
    open: boolean;
    onClose: () => void;
    categories: Category[];
}

/* ── Quiz data ──────────────────────────────────────────────── */
const QUESTIONS = [
    {
        step:     '01',
        question: 'How does your skin usually feel?',
        subtext:  'Be honest — your skin knows.',
        options: [
            { label: 'Tight & thirsty',    hint: 'Craving moisture 24/7',    tags: ['hydrat', 'moisture', 'cream', 'rich', 'balm', 'butter', 'dry'] },
            { label: 'Shiny by noon',       hint: 'The oily T-zone struggle', tags: ['mattif', 'cleanser', 'toner', 'light', 'gel', 'pore', 'oily'] },
            { label: 'Easily irritated',    hint: 'Sensitive & reactive',     tags: ['gentle', 'sensitiv', 'sooth', 'calm', 'aloe', 'oat'] },
            { label: 'Pretty balanced',     hint: 'Lucky you, honestly',      tags: ['vitamin', 'glow', 'serum', 'treat', 'bright', 'even'] },
        ],
    },
    {
        step:     '02',
        question: 'What does your skin want most?',
        subtext:  'Pick the one that made you go "yes, that."',
        options: [
            { label: 'A lit-from-within glow',    hint: 'Radiance, always',          tags: ['glow', 'bright', 'vitamin c', 'radiant', 'luminous', 'glow'] },
            { label: 'Deep, lasting hydration',   hint: 'Plump and dewy, all day',   tags: ['hydrat', 'hyaluronic', 'moisture', 'dewy', 'plump'] },
            { label: 'Smoother, softer texture',  hint: 'Petal-soft skin ambitions', tags: ['exfoliat', 'retinol', 'acid', 'resurf', 'smooth', 'peel'] },
            { label: 'More even skin tone',       hint: 'Goodbye dark spots',        tags: ['tone', 'dark spot', 'niacinamide', 'even', 'discolor', 'pigment'] },
        ],
    },
    {
        step:     '03',
        question: 'Your beauty ritual is...',
        subtext:  'There is no wrong answer. Mostly.',
        options: [
            { label: 'Minimal — 5 steps max',   hint: 'Effortless chic',            tags: ['all-in-one', 'balm', 'multi', 'simple', 'tinted', 'bb'] },
            { label: 'Layered & intentional',   hint: 'Every step earns its place', tags: ['toner', 'serum', 'essence', 'moisturiz', 'layer'] },
            { label: 'Targeted treatments',     hint: 'You came to solve problems', tags: ['treatment', 'mask', 'overnight', 'boost', 'activ', 'spot'] },
            { label: 'Clean beauty only',       hint: 'Green and gorgeous',         tags: ['natural', 'clean', 'organic', 'botanical', 'plant', 'vegan'] },
        ],
    },
];

const REACTIONS = [
    ['Noted. Your skin has standards.', 'Oil control — a full-time job.', 'Gentle products incoming.', 'The balanced-skin energy.'],
    ['Glowing? Absolutely.', 'Hydration is a lifestyle.', 'Smooth operator.', 'Even-toned supremacy.'],
    ['Minimal but make it luxe.', 'A woman of routine.', 'Tactical skincare. Love it.', 'Clean. Simple. Gorgeous.'],
];

/* ── Confetti ──────────────────────────────────────────────── */
const CONFETTI_COLORS = [GOLD_STATIC, '#E0D8CC', '#0A0A0A', '#fff'];
function Confetti() {
    const particles = Array.from({ length: 28 }, (_, i) => ({
        id:       i,
        left:     `${5 + (i / 28) * 90}%`,
        delay:    `${(i * 0.07) % 1}s`,
        duration: `${0.9 + (i % 4) * 0.2}s`,
        color:    CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size:     `${4 + (i % 4)}px`,
        round:    i % 3 !== 0,
    }));

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position:     'absolute',
                        top:          '-8px',
                        left:         p.left,
                        width:        p.size,
                        height:       p.size,
                        background:   p.color,
                        borderRadius: p.round ? '50%' : '0',
                        animation:    `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
                    }}
                />
            ))}
        </div>
    );
}

/* ── Main component ─────────────────────────────────────────── */
export default function BeautyQuiz({ open, onClose, categories }: Props) {
    const { GOLD, DARK, BORDER, MUTED, OFFWHITE, SURFACE } = useLuxuryTheme();
    const [step, setStep]           = useState(0);
    const [answers, setAnswers]     = useState<number[]>([]);
    const [selected, setSelected]   = useState<number | null>(null);
    const [reaction, setReaction]   = useState<string | null>(null);
    const [visible, setVisible]     = useState(true);
    const [result, setResult]       = useState<{ product: Product; categoryName: string } | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    /* close on Escape */
    const handleKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (open) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, handleKey]);

    /* reset when opened */
    useEffect(() => {
        if (open) {
            setStep(0); setAnswers([]); setSelected(null);
            setReaction(null); setVisible(true); setResult(null); setShowConfetti(false);
        }
    }, [open]);

    if (!open) return null;

    /* ── Matching algorithm ─── */
    const computeResult = (finalAnswers: number[]) => {
        const allTags = finalAnswers.flatMap((optIdx, qIdx) => QUESTIONS[qIdx].options[optIdx].tags);

        type Scored = { product: Product; categoryName: string; score: number };
        const scored: Scored[] = [];

        for (const cat of categories) {
            for (const p of cat.products) {
                const haystack = `${p.name} ${p.description ?? ''} ${cat.name}`.toLowerCase();
                let score = 0;
                for (const tag of allTags) if (haystack.includes(tag)) score++;
                if (p.is_featured) score += 0.5;
                scored.push({ product: p, categoryName: cat.name, score });
            }
        }

        scored.sort((a, b) => b.score - a.score);
        const best = scored[0] ?? null;
        return best;
    };

    /* ── Animate to next step ── */
    const advance = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        setReaction(REACTIONS[step][optionIndex]);

        setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                setReaction(null);
                if (step < QUESTIONS.length - 1) {
                    setStep(s => s + 1);
                    setSelected(null);
                    setVisible(true);
                } else {
                    const match = computeResult(newAnswers);
                    setResult(match);
                    setStep(QUESTIONS.length);
                    setVisible(true);
                    setTimeout(() => setShowConfetti(true), 100);
                }
            }, 320);
        }, 900);
    };

    const reset = () => {
        setVisible(false);
        setTimeout(() => {
            setStep(0); setAnswers([]); setSelected(null);
            setReaction(null); setResult(null); setShowConfetti(false);
            setVisible(true);
        }, 300);
    };

    const isResult = step === QUESTIONS.length;
    const q = QUESTIONS[step] ?? null;

    const imgUrl = result
        ? result.product.image_urls?.length > 0
            ? `/storage/${result.product.image_urls[0]}`
            : '/placeholder.png'
        : '';

    return (
        <div
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(10,10,10,0.65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px 16px',
                fontFamily: "'Montserrat', sans-serif",
            }}
        >
            <div style={{
                background: SURFACE,
                border: `0.5px solid ${BORDER}`,
                width: '100%',
                maxWidth: '520px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 0' }}>
                    <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD }}>
                        Beauty Quiz
                    </p>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: MUTED, lineHeight: 1, padding: '0 0 0 16px' }}
                        onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                    >×</button>
                </div>

                {/* Step dots */}
                {!isResult && (
                    <div style={{ display: 'flex', gap: '6px', padding: '14px 28px 0' }}>
                        {QUESTIONS.map((_, i) => (
                            <div key={i} style={{
                                height: '2px',
                                flex: 1,
                                background: i <= step ? GOLD : BORDER,
                                transition: 'background 0.4s',
                            }} />
                        ))}
                    </div>
                )}

                {/* Body */}
                <div
                    key={step + (reaction ? '-r' : '')}
                    className={visible ? (isResult ? 'quiz-result-enter' : 'quiz-step-enter') : ''}
                    style={{
                        padding: '28px 28px 32px',
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.3s',
                        position: 'relative',
                    }}
                >
                    {/* ── Reaction interlude ── */}
                    {reaction && (
                        <div style={{ textAlign: 'center', padding: '32px 0' }}>
                            <p className="font-display" style={{ fontSize: '26px', fontWeight: 300, color: DARK, lineHeight: 1.3 }}>
                                {reaction}
                            </p>
                        </div>
                    )}

                    {/* ── Question ── */}
                    {!reaction && !isResult && q && (
                        <>
                            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>
                                {q.step} / 03
                            </p>
                            <h2 className="font-display" style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 300, color: DARK, lineHeight: 1.25, marginBottom: '6px' }}>
                                {q.question}
                            </h2>
                            <p style={{ fontSize: '10px', color: MUTED, marginBottom: '24px', letterSpacing: '0.5px' }}>
                                {q.subtext}
                            </p>

                            {/* Options grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                                {q.options.map((opt, i) => {
                                    const active = selected === i;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelected(i)}
                                            style={{
                                                background:   active ? OFFWHITE : SURFACE,
                                                border:       `1px solid ${active ? GOLD : BORDER}`,
                                                padding:      '16px 14px',
                                                cursor:       'pointer',
                                                textAlign:    'left',
                                                transition:   'all 0.2s',
                                            }}
                                            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                                            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
                                        >
                                            <p className="font-display" style={{ fontSize: '16px', fontWeight: active ? 400 : 300, color: active ? GOLD : DARK, marginBottom: '4px', lineHeight: 1.2 }}>
                                                {opt.label}
                                            </p>
                                            <p style={{ fontSize: '9px', color: MUTED, letterSpacing: '0.5px' }}>
                                                {opt.hint}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Continue button */}
                            <button
                                onClick={() => selected !== null && advance(selected)}
                                disabled={selected === null}
                                className="btn-luxury btn-luxury-dark"
                                style={{
                                    width:   '100%',
                                    opacity: selected === null ? 0.35 : 1,
                                    cursor:  selected === null ? 'not-allowed' : 'pointer',
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                {step < QUESTIONS.length - 1 ? 'Continue' : 'Find my product'}
                            </button>
                        </>
                    )}

                    {/* ── Result ── */}
                    {!reaction && isResult && result && (
                        <>
                            {showConfetti && <Confetti />}

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '4px' }}>
                                    Your perfect match
                                </p>
                                <h2 className="font-display" style={{ fontSize: '26px', fontWeight: 300, color: DARK, marginBottom: '24px' }}>
                                    We found the one for you.
                                </h2>

                                {/* Product card */}
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', border: `0.5px solid ${BORDER}`, padding: '16px', marginBottom: '20px' }}>
                                    <div style={{ width: '90px', flexShrink: 0, aspectRatio: '3/4', overflow: 'hidden', background: OFFWHITE }}>
                                        <img
                                            src={imgUrl}
                                            alt={result.product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                                            {result.categoryName}
                                        </p>
                                        <p className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: DARK, marginBottom: '8px', lineHeight: 1.2 }}>
                                            {result.product.name}
                                        </p>
                                        <p style={{ fontSize: '13px', color: DARK, fontWeight: 500, marginBottom: '16px' }}>
                                            ${result.product.price}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <a
                                                href={`/product/${result.product.id}`}
                                                className="btn-luxury btn-luxury-dark"
                                                style={{ padding: '10px 20px', fontSize: '8px' }}
                                            >
                                                View product
                                            </a>
                                            <a
                                                href={`/go/${result.product.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-luxury btn-luxury-ghost"
                                                style={{ padding: '10px 20px', fontSize: '8px' }}
                                            >
                                                Buy now
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Retake */}
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={reset}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, borderBottom: `0.5px solid ${BORDER}`, paddingBottom: '1px' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; (e.currentTarget as HTMLElement).style.borderBottomColor = BORDER; }}
                                    >
                                        Retake the quiz
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Edge case: no products */}
                    {!reaction && isResult && !result && (
                        <div style={{ textAlign: 'center', padding: '32px 0' }}>
                            <p className="font-display" style={{ fontSize: '22px', fontWeight: 300, color: DARK, marginBottom: '16px' }}>
                                Hmm, no match yet.
                            </p>
                            <p style={{ fontSize: '10px', color: MUTED, marginBottom: '24px' }}>Try again — the perfect product is out there.</p>
                            <button onClick={reset} className="btn-luxury btn-luxury-dark" style={{ margin: '0 auto' }}>Retake</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
