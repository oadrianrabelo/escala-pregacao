"use client";

import dynamic from "next/dynamic";

const EscalaPregacao = dynamic(() => import("@/components/EscalaPregacao"), {
  ssr: false,
});

export default function Home() {
  return <EscalaPregacao />;
}
