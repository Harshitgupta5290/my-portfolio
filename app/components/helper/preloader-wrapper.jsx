"use client";

import { usePathname } from "next/navigation";
import Preloader from "./preloader";

export default function PreloaderWrapper() {
  const pathname = usePathname();
  return <Preloader key={pathname} />;
}
