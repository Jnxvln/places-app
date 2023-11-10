"use client";
import Header from "@/lib/components/ui/Header/Header";
import TestApi from '@/lib/components/Sandbox/TestApi';
import Map from "@/lib/components/Map/Map";

export default function Sandbox () {
  return (
    <section>
      <Header title="Sandbox" />
      <Map />
      <TestApi />
    </section>
  )
}