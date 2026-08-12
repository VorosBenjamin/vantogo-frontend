import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ACCESSORIES, FAQS, FEATURES, FLEET, SEGMENTS, TIME_OPTIONS, WINTER_PACKAGES } from './data';

const FALLBACK_CATALOG = {
  fleet: FLEET,
  accessories: ACCESSORIES,
  faqs: FAQS,
  features: FEATURES,
  segments: SEGMENTS,
  winterPackages: WINTER_PACKAGES,
  timeOptions: TIME_OPTIONS,
};

const CatalogContext = createContext({ ...FALLBACK_CATALOG, source: 'fallback' });

export function CatalogProvider({ children, initialCatalog }) {
  const [catalog, setCatalog] = useState(() => ({
    ...FALLBACK_CATALOG,
    ...initialCatalog,
    fleet: initialCatalog?.fleet?.length ? initialCatalog.fleet : FALLBACK_CATALOG.fleet,
    accessories: initialCatalog?.accessories?.length ? initialCatalog.accessories : FALLBACK_CATALOG.accessories,
  }));
  const [source, setSource] = useState(initialCatalog?.source || 'fallback');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/catalog', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Catalog unavailable'))))
      .then((payload) => {
        if (Array.isArray(payload.fleet) && payload.fleet.length > 0) {
          setCatalog((current) => ({
            ...current,
            fleet: payload.fleet,
            accessories: Array.isArray(payload.accessories) && payload.accessories.length > 0
              ? payload.accessories
              : current.accessories,
          }));
          setSource(payload.source || 'wix');
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSource('fallback');
      });

    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ ...catalog, source }), [catalog, source]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}
