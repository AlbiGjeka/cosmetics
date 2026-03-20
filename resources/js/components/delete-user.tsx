import { Form } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import InputError from '@/components/input-error';

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <p style={{ fontSize: '11px', color: MUTED, marginBottom: '16px', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.7 }}>
                Once your account is deleted, all of its resources and data will be permanently removed. This action cannot be undone.
            </p>

            <button
                type="button"
                onClick={() => setOpen(true)}
                style={{ padding: '9px 24px', border: '0.5px solid #dc2626', background: 'none', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#dc2626', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#dc2626'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#dc2626'; }}
                data-test="delete-user-button"
            >
                Delete account
            </button>

            {/* Confirm modal */}
            {open && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
                    onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
                >
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.6)' }} />

                    <div style={{ position: 'relative', background: 'white', border: `0.5px solid ${BORDER}`, width: '100%', maxWidth: '440px', fontFamily: "'Montserrat', sans-serif" }}>
                        {/* Header */}
                        <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#dc2626', marginBottom: '4px' }}>
                                Danger zone
                            </p>
                            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 300, color: DARK }}>
                                Delete account?
                            </h2>
                        </div>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{ preserveScroll: true }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <p style={{ fontSize: '11px', color: MUTED, lineHeight: 1.7 }}>
                                        Please enter your password to confirm you would like to permanently delete your account.
                                    </p>

                                    <div>
                                        <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '8px' }}>
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: `0.5px solid ${BORDER}`, background: 'transparent', fontSize: '13px', fontFamily: "'Montserrat', sans-serif", color: DARK, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                                            onFocus={e => (e.target as HTMLElement).style.borderBottomColor = '#dc2626'}
                                            onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div style={{ paddingTop: '8px', borderTop: `0.5px solid ${BORDER}`, display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={() => { resetAndClearErrors(); setOpen(false); }}
                                            style={{ padding: '9px 20px', border: `0.5px solid ${BORDER}`, background: 'none', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            style={{ padding: '9px 20px', border: '0.5px solid #dc2626', background: '#dc2626', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'white', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s', opacity: processing ? 0.6 : 1 }}
                                            data-test="confirm-delete-user-button"
                                        >
                                            {processing ? 'Deleting…' : 'Delete account'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
}
