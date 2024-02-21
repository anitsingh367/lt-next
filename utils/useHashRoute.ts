import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function useHashRouteToggle(hash: string): [boolean, (bool: boolean) => void] {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const toggleActive = useCallback((bool: boolean) => {
    if (bool !== isActive) {
      if (bool) {
        router.push(router.pathname + "#" + hash, undefined, { shallow: true });
      } else {
        const pathWithoutHash = router.asPath.split('#')[0];
        router.push(pathWithoutHash, undefined, { shallow: true });
      }
      setIsActive(bool);
    }
  }, [hash, isActive, router]);

  useEffect(() => {
    const handleOnHashChange = () => {
      setIsActive(window.location.hash.includes(hash));
    };

    window.addEventListener("hashchange", handleOnHashChange);

    if (window.location.hash.includes(hash)) {
      setIsActive(true);
    }

    return () => window.removeEventListener("hashchange", handleOnHashChange);
  }, [hash]);

  return [isActive, toggleActive];
}
