import Link from "next/link";
import Image from "next/image";

const NexaLogo = () => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Nexa Climate</span>
      <Image width={120} height={30} src="/nexa-logo.png" alt="" />
    </Link>
  );
};

export default NexaLogo;
