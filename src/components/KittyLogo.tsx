import Image from "next/image";

interface Props {
    size?: number;
}

export default function KittyLogo({ size = 48 }: Props) {
    return (
        <Image
            src="/Adsız tasarım kopyası.png"
            alt="Kitty Logo"
            width={size * 1.75}
            height={size * 1.75}
            style={{ objectFit: "contain", display: "inline-flex", justifyContent: "center", alignItems: "center" }}
        />
    );
}
