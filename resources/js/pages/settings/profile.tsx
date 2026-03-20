import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import DeleteUser from '@/components/delete-user';
import { Link } from '@inertiajs/react';
import { send } from '@/routes/verification';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Profile settings', href: '/settings/profile' },
];

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

const fieldLabel: React.CSSProperties = {
    fontSize: '9px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: MUTED,
    display: 'block',
    marginBottom: '8px',
    fontFamily: "'Montserrat', sans-serif",
};

const fieldInput: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderBottom: `0.5px solid ${BORDER}`,
    background: 'transparent',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    color: DARK,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color .2s',
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        user.avatar ? `/storage/${user.avatar}` : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name ?? '',
        email: user.email ?? '',
        bio: (user.bio as string) ?? '',
        phone: (user.phone as string) ?? '',
        avatar: null as File | null,
    });

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('avatar', file);
        setAvatarPreview(URL.createObjectURL(file));
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/settings/profile', { forceFormData: true });
    }

    const initials = user.name
        ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <form onSubmit={submit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* ── Avatar card ── */}
                    <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                        <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                                Photo
                            </p>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                            {/* Square avatar */}
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <div style={{ width: '80px', height: '80px', border: `0.5px solid ${BORDER}`, background: OFFWHITE, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span className="font-display" style={{ fontSize: '24px', fontWeight: 300, color: GOLD }}>{initials}</span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '24px', height: '24px', background: DARK, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}
                                    title="Change photo"
                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = GOLD)}
                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = DARK)}
                                >
                                    +
                                </button>
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleAvatarChange} />
                            </div>

                            {/* Name + role */}
                            <div>
                                <p className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: DARK, marginBottom: '4px' }}>{user.name}</p>
                                <p style={{ fontSize: '10px', color: MUTED, marginBottom: '8px', fontFamily: "'Montserrat', sans-serif" }}>{user.email}</p>
                                <span style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, border: `0.5px solid ${GOLD}`, padding: '3px 8px', fontFamily: "'Montserrat', sans-serif" }}>
                                    {(user.role as string) ?? 'customer'}
                                </span>
                            </div>
                        </div>
                        {errors.avatar && (
                            <div style={{ padding: '0 24px 16px' }}>
                                <InputError message={errors.avatar} />
                            </div>
                        )}
                    </div>

                    {/* ── Details card ── */}
                    <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                        <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                                Personal information
                            </p>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Name */}
                            <div>
                                <label htmlFor="name" style={fieldLabel}>Full name</label>
                                <input
                                    id="name" type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    style={fieldInput}
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" style={fieldLabel}>Email address</label>
                                <input
                                    id="email" type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    style={fieldInput}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                <InputError message={errors.email} />
                                {mustVerifyEmail && (user as any).email_verified_at === null && (
                                    <p style={{ fontSize: '10px', color: '#92400e', marginTop: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                                        Your email is unverified.{' '}
                                        <Link href={send()} as="button" style={{ color: GOLD, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", fontSize: '10px' }}>
                                            Resend verification
                                        </Link>
                                    </p>
                                )}
                                {status === 'verification-link-sent' && (
                                    <p style={{ fontSize: '10px', color: '#065f46', marginTop: '6px', fontFamily: "'Montserrat', sans-serif" }}>Verification email sent!</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" style={fieldLabel}>Phone number</label>
                                <input
                                    id="phone" type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    style={fieldInput}
                                    placeholder="+355 69 123 4567"
                                    autoComplete="tel"
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                <InputError message={errors.phone} />
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" style={fieldLabel}>
                                    Bio <span style={{ fontSize: '8px', opacity: 0.6 }}>(optional)</span>
                                </label>
                                <textarea
                                    id="bio"
                                    rows={3}
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    style={{ ...fieldInput, resize: 'vertical' }}
                                    placeholder="Tell us a little about yourself…"
                                    maxLength={500}
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <InputError message={errors.bio} />
                                    <span style={{ fontSize: '9px', color: MUTED, fontFamily: "'Montserrat', sans-serif", marginLeft: 'auto' }}>{data.bio.length}/500</span>
                                </div>
                            </div>

                            {/* Save */}
                            <div style={{ paddingTop: '8px', borderTop: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-luxury btn-luxury-dark"
                                    style={{ opacity: processing ? 0.6 : 1 }}
                                >
                                    {processing ? 'Saving…' : 'Save changes'}
                                </button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveTo="opacity-0"
                                >
                                    <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, fontFamily: "'Montserrat', sans-serif" }}>
                                        ✓ Saved
                                    </p>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </form>

                {/* ── Danger zone ── */}
                <div style={{ marginTop: '24px', border: `0.5px solid #fca5a5`, background: '#fff5f5' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '0.5px solid #fca5a5' }}>
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#dc2626', fontFamily: "'Montserrat', sans-serif" }}>
                            Danger zone
                        </p>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <DeleteUser />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
