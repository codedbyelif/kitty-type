import Image from "next/image";

interface Props {
    size?: number;
}

export default function KittyLogo({ size = 48 }: Props) {
    return (
        <Image
            src="/Adsız tasarım.png"
            alt="Kitty Logo"
            width={size}
            height={size}
            style={{ objectFit: "contain", display: "inline-flex", justifyContent: "center", alignItems: "center" }}
        />
    );
}
