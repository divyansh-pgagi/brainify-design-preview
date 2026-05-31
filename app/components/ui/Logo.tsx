import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center shrink-0">
      <Image
        src="/logo-with-txt.svg"
        alt="brAInify"
        width={160}
        height={44}
        priority
        className="h-11 w-auto"
      />
    </a>
  );
}
