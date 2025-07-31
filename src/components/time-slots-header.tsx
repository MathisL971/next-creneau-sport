import TimeSlotsHeaderActions from './time-slots-header-actions';

export default function TimeSlotsHeader() {
  return (
    <div className="flex justify-between border-b w-full pb-2">
      <p className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0">
        Créneaux Disponibles
      </p>
      <TimeSlotsHeaderActions />
    </div>
  );
}
