interface Props {
    size?: number;
}

export default function KittyLogo({ size = 48 }: Props) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Head */}
            <ellipse cx="50" cy="55" rx="36" ry="32" fill="#fff" stroke="#ffb3d9" strokeWidth="2" />
            {/* Left ear */}
            <polygon points="18,30 10,8 34,22" fill="#fff" stroke="#ffb3d9" strokeWidth="2" />
            <polygon points="22,28 16,14 32,24" fill="#ffb3d9" />
            {/* Right ear */}
            <polygon points="82,30 90,8 66,22" fill="#fff" stroke="#ffb3d9" strokeWidth="2" />
            <polygon points="78,28 84,14 68,24" fill="#ffb3d9" />
            {/* Eyes */}
            <ellipse cx="37" cy="52" rx="5" ry="5.5" fill="#2d1b25" />
            <ellipse cx="63" cy="52" rx="5" ry="5.5" fill="#2d1b25" />
            {/* Eye shine */}
            <circle cx="39" cy="49.5" r="1.5" fill="white" />
            <circle cx="65" cy="49.5" r="1.5" fill="white" />
            {/* Nose */}
            <ellipse cx="50" cy="62" rx="3" ry="2" fill="#ff85c4" />
            {/* Whiskers left */}
            <line x1="14" y1="60" x2="44" y2="63" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="65" x2="44" y2="65" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="70" x2="44" y2="67" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            {/* Whiskers right */}
            <line x1="86" y1="60" x2="56" y2="63" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="86" y1="65" x2="56" y2="65" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="86" y1="70" x2="56" y2="67" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bow */}
            <polygon points="64,28 72,20 74,30 66,31" fill="#ff1493" opacity="0.9" />
            <polygon points="80,28 72,20 70,30 78,31" fill="#ff1493" opacity="0.9" />
            <circle cx="72" cy="27" r="4" fill="#ff47a3" />
        </svg>
    );
}
