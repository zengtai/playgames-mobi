import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon } from "./Icons";
import Image from "./Image";
import logo from "../public/brand/logo.png";
import logoSm from "../public/brand/logo-sm.png";

import { SITE_META } from "../lib/constants";
import { getIcon } from "../components/Icons";

export default function Navbar({ items, isOpen }) {
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setMenuOpen] = useState(isOpen);

  function toggle() {
    setMenuOpen(!isMenuOpen);
  }
  // console.log(children);
  const categoryNav = items.sort().map((category) => {
    return (
      <li
        className={`basis-1/2 transition duration-500 ease-in-out sm:basis-1/4 md:basis-[auto] md:bg-slate-50/0`}
        key={category}
      >
        <Link href={`/category/${category.toLowerCase()}`}>
          <a
            className={`${
              category.toLowerCase() == current.slug
                ? `border-slate-50/80 bg-slate-50/10  opacity-80 md:shadow-lg`
                : `border-slate-50/20 opacity-50 md:shadow-none`
            } m-2 flex rounded-xl border-2 p-2 text-white hover:bg-slate-50/10 `}
          >
            {/* <span className="mr-1">{getIcon(category.name)}</span> */}
            {category}
          </a>
        </Link>
      </li>
    );
  });
  return (
    <nav className="relative z-20 bg-[#fff9db] md:bg-transparent md:after:hidden">
      <div className="relative z-30 block">
        <Link href={`/`}>
          <a className="shadow-[lg] absolute left-2 -top-2 z-20 flex items-center justify-center rounded-[100%] p-1 shadow-stone-900 transition duration-200 ease-in-out md:top-4 md:left-3 md:h-20 md:w-20 md:border-[#FFB03A99] md:bg-[#FFF9DB] md:hover:scale-105 md:hover:bg-[#FFF9DB]">
            {/* {homeIcon()} */}
            <span className="md:hidden">
              <Image
                src={logo}
                alt={SITE_META.name}
                width={173}
                height={54}
                className="w-full"
                priority
              />
            </span>
            <span className="hidden md:block md:h-16 md:w-16">
              <Image
                src={logoSm}
                alt={SITE_META.name}
                width={60}
                height={60}
                className="w-full"
                layout="responsive"
                priority
              />
            </span>
          </a>
        </Link>
        <button
          onClick={toggle}
          className="my-2 ml-auto flex h-10 w-10 items-center justify-center text-[#463838] md:hidden"
        >
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`${
            !isMenuOpen ? `hidden md:block` : `block`
          } relative z-30 block p-3 md:z-10
          `}
        >
          <ul className="relative z-30 flex flex-wrap rounded-3xl bg-[#463838] p-2 capitalize shadow-lg shadow-slate-900/20 md:ml-3 md:mt-2 md:bg-[#463838] md:pl-20">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
