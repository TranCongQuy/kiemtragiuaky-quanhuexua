import { useState, useEffect } from "react";

export default function useLocalStorage(khoa, giaTriDau) {
  const [giaTri, setGiaTri] = useState(() => {
    try {
      const daLuu = window.localStorage.getItem(khoa);
      if (daLuu === null) return giaTriDau;
      return JSON.parse(daLuu);
    } catch {
      return giaTriDau;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(khoa, JSON.stringify(giaTri));
    } catch {
      // Bỏ qua
    }
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}
