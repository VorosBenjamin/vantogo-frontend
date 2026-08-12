import { getCatalog } from '../../lib/wixCatalog';

export const GET = async () => {
  try {
    const catalog = await getCatalog();
    return Response.json(catalog, {
      headers: { 'Cache-Control': catalog.source === 'wix-cms' ? 'public, max-age=60' : 'no-store' },
    });
  } catch (error) {
    console.error('Wix catalogue query failed', error);
    return Response.json({ error: 'A járműadatok átmenetileg nem érhetők el.' }, { status: 503 });
  }
};
