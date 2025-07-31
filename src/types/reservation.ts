interface Borough {
  $id: string;
  id: number;
  name: string;
  externalId: string | null;
}

interface Site {
  $id: string;
  id: number;
  name: string;
  address: string | null;
  publicPhone: string | null;
  fax: string | null;
  boroughs: Borough[];
}

interface FacilityType {
  $id: string;
  id: number;
  name: string;
  description: string;
}

interface Facility {
  $id: string;
  site: Site;
  isMembershipRequired: boolean;
  name: string;
  id: number;
  facilityType: FacilityType;
}

interface ValidationResult {
  entityType: string | null;
  extraParameter: string | null;
  parameters: string[];
  dateTimeParameters: string[];
  resultType: string;
  rule: string;
  warning: boolean;
}

interface CanReserve {
  $id: string;
  value: boolean;
  validationResult: ValidationResult;
}

export interface FacilityReservation {
  $id: string;
  facility: Facility;
  startDateTime: string;
  endDateTime: string;
  priorNoticeDelayInMinutes: number;
  facilityScheduleId: number;
  totalPrice: number;
  canReserve: CanReserve;
  facilityPricingId: number;
}
