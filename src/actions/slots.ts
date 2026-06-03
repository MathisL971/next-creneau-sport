'use server';

const baseUrl =
  'https://loisirs.montreal.ca/IC3/api/U6510/public/search/?_=1753903640586';

export async function fetchSlotsFromFiltersAction(filters: Record<string, unknown>) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
      // Never cache: results are live availability data and must reflect the
      // exact offset/limit in the request body, not a previously cached page.
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching Montreal slots:', error);
    return { success: false, error: 'Failed to fetch slots data' };
  }
}
