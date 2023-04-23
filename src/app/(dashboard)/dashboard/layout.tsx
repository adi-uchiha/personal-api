import React from "react";
import type { ReactNode } from "react";


export default function layout({
  children
}: {children: ReactNode}) {
  return <section className="pt-20">{children}</section>
}