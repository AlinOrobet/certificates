import Image from "next/image";
import Link from "next/link";

type Props = {
  locale: string;
};

export const HeaderLogo = ({locale}: Props) => {
  return (
    <Link href={`/${locale}/admin`}>
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" alt="logo" height={28} width={28} />
        <p className="font-semibold text-white ml-2.5">Certificates A&A</p>
      </div>
    </Link>
  );
};
