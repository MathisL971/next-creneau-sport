import TimeSlotsTable from './time-slots-table';

export const DEFAULT_PARAMS = {
  isSortOrderAsc: true,
  limit: 10,
  offset: 0,
  sortColumn: 'startDateTime',
};

export default async function TimeSlots({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const hasMandatoryFilters =
    params.searchString &&
    params.dates &&
    JSON.parse(params.dates as string).length > 0 &&
    (params.boroughIds || params.siteId);

  let timeSlotsData = null;

  if (hasMandatoryFilters) {
    const timeSlots = await fetch(
      'https://loisirs.montreal.ca/IC3/api/U6510/public/search/?_=1753903640586',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...DEFAULT_PARAMS,
          ...params,
          dates: JSON.parse(params.dates as string),
        }),
      }
    );

    timeSlotsData = await timeSlots.json();
  }

  return <TimeSlotsTable timeSlots={timeSlotsData} />;
}
