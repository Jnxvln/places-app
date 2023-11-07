"use client";
import Header from "@/lib/components/ui/Header/Header";
import TestApi from '@/lib/components/Sandbox/TestApi';

export default function Sandbox () {

  return (
    <section>
      <Header title="Sandbox" />
      <TestApi />
    </section>
  )
}