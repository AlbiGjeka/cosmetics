import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';

const inputStyle: React.CSSProperties = {
    width: '100%',
    border: 'none',
    borderBottom: `0.5px solid ${BORDER}`,
    background: 'transparent',
    padding: '10px 0',
    fontSize: '13px',
    color: DARK,
    outline: 'none',
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '0.5px',
};

const labelStyle: React.CSSProperties = {
    fontSize: '8px',
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    color: MUTED,
    display: 'block',
    marginBottom: '4px',
};

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to your account"
        >
            <Head title="Log in" />

            {status && (
                <p style={{ marginBottom: '20px', fontSize: '11px', color: '#16a34a', textAlign: 'center' }}>
                    {status}
                </p>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" style={labelStyle}>Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                                style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = BORDER)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                                {canResetPassword && (
                                    <a href={request()} tabIndex={5}
                                        style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', borderBottom: `0.5px solid transparent` }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}
                                    >
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Password"
                                style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = BORDER)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember me */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                tabIndex={3}
                                style={{ accentColor: GOLD, width: '14px', height: '14px', cursor: 'pointer' }}
                            />
                            <label htmlFor="remember" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, cursor: 'pointer' }}>
                                Remember me
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            tabIndex={4}
                            disabled={processing}
                            className="btn-luxury btn-luxury-dark"
                            style={{ width: '100%', opacity: processing ? 0.6 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}
                            data-test="login-button"
                        >
                            {processing ? 'Signing in…' : 'Sign in'}
                        </button>

                        {canRegister && (
                            <p style={{ textAlign: 'center', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                No account?{' '}
                                <a href={register()} tabIndex={5}
                                    style={{ color: DARK, textDecoration: 'none', borderBottom: `0.5px solid ${DARK}`, paddingBottom: '1px' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = DARK; (e.currentTarget as HTMLElement).style.borderBottomColor = DARK; }}
                                >
                                    Create account
                                </a>
                            </p>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
