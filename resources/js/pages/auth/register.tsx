import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

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

export default function Register() {
    return (
        <AuthLayout
            title="Create account"
            description="Join the beauty edit"
        >
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
                {({ processing, errors }) => (
                    <>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" style={labelStyle}>Full name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                placeholder="Your name"
                                style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = BORDER)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" style={labelStyle}>Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                tabIndex={2}
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
                            <label htmlFor="password" style={labelStyle}>Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                placeholder="Password"
                                style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = BORDER)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label htmlFor="password_confirmation" style={labelStyle}>Confirm password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = BORDER)}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Divider */}
                        <div style={{ height: '0.5px', background: BORDER }} />

                        {/* Submit */}
                        <button
                            type="submit"
                            tabIndex={5}
                            disabled={processing}
                            className="btn-luxury btn-luxury-dark"
                            style={{ width: '100%', opacity: processing ? 0.6 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}
                            data-test="register-user-button"
                        >
                            {processing ? 'Creating account…' : 'Create account'}
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                            Already a member?{' '}
                            <a href={login()} tabIndex={6}
                                style={{ color: DARK, textDecoration: 'none', borderBottom: `0.5px solid ${DARK}`, paddingBottom: '1px' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = DARK; (e.currentTarget as HTMLElement).style.borderBottomColor = DARK; }}
                            >
                                Sign in
                            </a>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
