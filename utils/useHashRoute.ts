'use client'
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
 

export default function useHashRouteToggle(hash: string): [boolean, (bool: boolean) => void] {
  const router = useRouter()
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false);

  const toggleActive = (bool: boolean) => {
    if (bool !== isActive) {
      if (bool) {
        router.push(pathname + "#" + hash);
      } else {
        window.history.back();
      }
      setIsActive(bool);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleOnHashChange = () => {
        setIsActive(false);
      };

      window.addEventListener("hashchange", handleOnHashChange);

      return () => window.removeEventListener("hashchange", handleOnHashChange);
    }
  }, []);

  return [isActive, toggleActive];
}
