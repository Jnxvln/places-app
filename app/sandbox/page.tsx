"use client";
import Header from "@/lib/components/ui/Header/Header";
import TestApi from '@/lib/components/Sandbox/TestApi';
import GoogleMapsLoader from "@/lib/components/GoogleMapsLoader/GoogleMapsLoader";

export default function Sandbox () {
  return (
    <section>
      <Header title="Sandbox" />
      <GoogleMapsLoader />
      <TestApi />
    </section>
  )
}