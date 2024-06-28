import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "../cta/CTAButton";

const Navbar = () => {
  return (
    <nav>
      <Image
        src="/assets/logo.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <CTAButton title="Shop Now" toPath="/about" />
    </nav>
  );
};

export default Navbar;
