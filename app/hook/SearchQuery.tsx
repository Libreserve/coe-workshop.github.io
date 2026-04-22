import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
  (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name); // ถ้าค่าว่าง ให้ลบ param ออกจาก URL
      }
      return params.toString();
    },
    [searchParams]
  );
  return createQueryString;
} 

export function useSetQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const setQuery = useCallback(
    (name: string, value: string | null) => {
      router.push(pathname + "?" + createQueryString(name, value));
    },
    [router, pathname, createQueryString]
  );

  return setQuery;
}