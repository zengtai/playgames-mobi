import { SITE_NAME } from "../lib/constants";
import Link from "next/link";
import Image from "./Image";
export default function Footer() {
  return (
    <div className="mt-3 text-center text-xs text-slate-900/60">
      <nav className="group space-x-5 p-3 md:bg-[#00000020]">
        <Link href={`/t/privacy-policy`}>
          <a>Privacy Policy</a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a>Terms of Use</a>
        </Link>
      </nav>
      <div className="pb-7 leading-5 opacity-90 md:pt-3">
        <div className="relative mx-auto mb-2 h-[40px] w-[128px]">
          <Image src={`/brand/logo.png`} alt={SITE_NAME} layout="fill" />
        </div>
        Copyright &copy; {new Date().getFullYear()} {SITE_NAME}
        <br />
        All Rights Reserved
      </div>
    </div>
  );
}
