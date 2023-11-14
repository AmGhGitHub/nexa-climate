import React from "react";

import Image from "next/image";
const Page = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/emission-factors.png"
        width={900}
        height={600}
        alt="Emission Factor"
      />
    </div>
  );
};

export default Page;
