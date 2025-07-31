import TimeSlotsHeaderActions from './time-slots-header-actions';

export default function TimeSlotsHeader() {
  return (
    <div className="flex flex-row justify-between items-center border-b w-full pb-2 gap-2">
      <p className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 min-w-0">
        Créneaux Disponibles
      </p>
      <div className="flex-shrink-0">
        <TimeSlotsHeaderActions />
      </div>
    </div>
  );
}
