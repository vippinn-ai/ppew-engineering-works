"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalogue from "@/components/Catalogue";
import { Capabilities, Facility } from "@/components/Capabilities";
import { RfqBar, Enquiry, Footer } from "@/components/Enquiry";
import type { PlatformId } from "@/lib/catalog";

export default function Home() {
  const [platform, setPlatform] = useState<PlatformId | "all">("all");
  const [rfq, setRfq] = useState<string[]>([]);

  const toggle = (id: string) =>
    setRfq((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <>
      <Header rfqCount={rfq.length} />
      <main>
        <Hero selected={platform} onSelect={setPlatform} />
        <Catalogue
          selected={platform}
          onSelect={setPlatform}
          rfq={rfq}
          onToggleRfq={toggle}
        />
        <Capabilities />
        <Facility />
        <Enquiry rfq={rfq} />
      </main>
      <RfqBar rfq={rfq} onClear={() => setRfq([])} />
      <Footer />
    </>
  );
}
