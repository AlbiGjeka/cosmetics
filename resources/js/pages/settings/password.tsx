import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';
import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/user-password';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Password settings', href: edit().url },
];

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';

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

export default function Password() {
    const passwordInput        = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                    <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                            Update password
                        </p>
                        <p style={{ fontSize: '11px', color: MUTED, marginTop: '4px', fontFamily: "'Montserrat', sans-serif" }}>
                            Use a long, random password to keep your account secure.
                        </p>
                    </div>

                    <Form
                        {...PasswordController.update.form()}
                        options={{ preserveScroll: true }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password)         passwordInput.current?.focus();
                            if (errors.current_password) currentPasswordInput.current?.focus();
                        }}
                        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <>
                                {/* Current password */}
                                <div>
                                    <label htmlFor="current_password" style={fieldLabel}>Current password</label>
                                    <input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        type="password"
                                        style={fieldInput}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                        onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                    />
                                    <InputError message={errors.current_password} />
                                </div>

                                {/* New password */}
                                <div>
                                    <label htmlFor="password" style={fieldLabel}>New password</label>
                                    <input
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        type="password"
                                        style={fieldInput}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                        onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm password */}
                                <div>
                                    <label htmlFor="password_confirmation" style={fieldLabel}>Confirm password</label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        style={fieldInput}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                        onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Save */}
                                <div style={{ paddingTop: '8px', borderTop: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-luxury btn-luxury-dark"
                                        style={{ opacity: processing ? 0.6 : 1 }}
                                        data-test="update-password-button"
                                    >
                                        {processing ? 'Saving…' : 'Save password'}
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
                            </>
                        )}
                    </Form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
