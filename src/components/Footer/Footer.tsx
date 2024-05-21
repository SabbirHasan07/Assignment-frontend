// Footer Component

import Image from "next/image";
import logo from "../../../public/images/pokemon.png"
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <footer className="w-full p-4 bg-gray-900 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="block w-96 mx-auto text-sm text-gray-500">
          <Image className="ml-24" src={logo} alt="logo" height={100} width={100}/>
          Copyright © {year} pokemon. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;
