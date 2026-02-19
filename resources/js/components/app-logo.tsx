import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-pink-100">
                {/* Petal flower mark */}
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <ellipse cx="16" cy="9"  rx="3" ry="5.5" fill="#ec4899" />
                    <ellipse cx="16" cy="23" rx="3" ry="5.5" fill="#ec4899" />
                    <ellipse cx="9"  cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                    <ellipse cx="23" cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                    <ellipse cx="10.9" cy="10.9" rx="3" ry="5.5" transform="rotate(-45 10.9 10.9)" fill="#ec4899" opacity="0.7" />
                    <ellipse cx="21.1" cy="21.1" rx="3" ry="5.5" transform="rotate(-45 21.1 21.1)" fill="#ec4899" opacity="0.7" />
                    <ellipse cx="21.1" cy="10.9" rx="3" ry="5.5" transform="rotate(45 21.1 10.9)" fill="#f9a8d4" opacity="0.7" />
                    <ellipse cx="10.9" cy="21.1" rx="3" ry="5.5" transform="rotate(45 10.9 21.1)" fill="#f9a8d4" opacity="0.7" />
                    <circle cx="16" cy="16" r="4" fill="#be185d" />
                    <circle cx="16" cy="16" r="2" fill="#fce7f3" />
                </svg>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    <span className="text-pink-600">Enxhi</span> Beauty
                </span>
            </div>
        </>
    );
}

