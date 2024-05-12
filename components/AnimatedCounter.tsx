'use client'
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ ammount }: { ammount: number }) => {
  return (
    <span className="w-full">
      <CountUp
        end={ammount}
        decimal=","
        decimals={2}
        prefix="$"
        duration={2.75}
      />
    </span>
  );
};

export default AnimatedCounter;
