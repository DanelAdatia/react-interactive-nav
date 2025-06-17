import { useEffect, useState } from 'react';

type Page = {
  name: string;
};

export const useValidatePage = (id: string | undefined) => {
  const [isValidPage, setIsValidPage] = useState<boolean | null>(null);

  useEffect(() => {
    const storedPages = localStorage.getItem('pages');
    if (!storedPages) {
      setIsValidPage(false);
      return;
    }

    try {
      const pages: Page[] = JSON.parse(storedPages);
      const normalizedId = (id || '').toLowerCase().replace(/\s+/g, '');
      const exists = pages.some(
        (page) => page.name.toLowerCase().replace(/\s+/g, '') === normalizedId
      );
      setIsValidPage(exists);
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      setIsValidPage(false);
    }
  }, [id]);

  return isValidPage;
};
