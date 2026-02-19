import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Camera, Mail, Phone, Save, Trash2, User } from 'lucide-react';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import DeleteUser from '@/components/delete-user';
import { Link } from '@inertiajs/react';
import { send } from '@/routes/verification';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Profile settings', href: '/settings/profile' },
];

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

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
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
                <form onSubmit={submit} encType="multipart/form-data">
                    {/* ── Avatar card ── */}
                    <div className="mb-8 overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white shadow-sm">
                        {/* Banner strip */}
                        <div className="h-24 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300" />

                        <div className="px-6 pb-6">
                            {/* Avatar + name row */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:-mt-0">
                                {/* Avatar */}
                                <div className="relative -mt-12">
                                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md bg-pink-100 flex items-center justify-center">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-pink-400">
                                                {initials}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white shadow hover:bg-pink-700 transition"
                                        title="Change photo"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </div>

                                <div className="flex flex-col sm:ml-2 sm:mb-1">
                                    <p className="text-lg font-bold text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <span className="mt-1 inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-700 capitalize">
                                        {(user.role as string) ?? 'customer'}
                                    </span>
                                </div>
                            </div>

                            {avatarPreview && (
                                <div className="mt-3">
                                    <InputError message={errors.avatar} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Details card ── */}
                    <div className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <User className="h-4 w-4 text-pink-500" />
                            Personal information
                        </h2>

                        {/* Name */}
                        <div className="grid gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                placeholder="Your full name"
                                autoComplete="name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5 text-pink-500" />
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            <InputError message={errors.email} />

                            {mustVerifyEmail && user.email_verified_at === null && (
                                <p className="text-xs text-amber-600">
                                    Your email is unverified.{' '}
                                    <Link href={send()} as="button" className="underline hover:text-amber-700">
                                        Resend verification
                                    </Link>
                                </p>
                            )}
                            {status === 'verification-link-sent' && (
                                <p className="text-xs text-green-600 font-medium">Verification email sent!</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="grid gap-1.5">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5 text-pink-500" />
                                Phone number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                placeholder="+355 69 123 4567"
                                autoComplete="tel"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        {/* Bio */}
                        <div className="grid gap-1.5">
                            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
                                Bio
                                <span className="ml-1 text-xs text-gray-400">(optional)</span>
                            </label>
                            <textarea
                                id="bio"
                                rows={3}
                                value={data.bio}
                                onChange={e => setData('bio', e.target.value)}
                                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                placeholder="Tell us a little about yourself…"
                                maxLength={500}
                            />
                            <div className="flex justify-between">
                                <InputError message={errors.bio} />
                                <span className="ml-auto text-xs text-gray-400">{data.bio.length}/500</span>
                            </div>
                        </div>

                        {/* Save button */}
                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-pink-700 disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? 'Saving…' : 'Save changes'}
                            </button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out duration-300"
                                enterFrom="opacity-0 translate-y-1"
                                leave="transition ease-in-out duration-300"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-emerald-600 font-medium">✓ Profile updated!</p>
                            </Transition>
                        </div>
                    </div>
                </form>

                {/* ── Danger zone ── */}
                <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6">
                    <h2 className="mb-4 text-sm font-semibold text-red-700 flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Danger zone
                    </h2>
                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
