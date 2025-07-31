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
  dateTimeParameters: any[];
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

// Alternative: If you prefer a more concise nested approach
type FacilityReservationNested = {
  $id: string;
  facility: {
    $id: string;
    site: {
      $id: string;
      id: number;
      name: string;
      address: string | null;
      publicPhone: string | null;
      fax: string | null;
      boroughs: Array<{
        $id: string;
        id: number;
        name: string;
        externalId: string | null;
      }>;
    };
    isMembershipRequired: boolean;
    name: string;
    id: number;
    facilityType: {
      $id: string;
      id: number;
      name: string;
      description: string;
    };
  };
  startDateTime: string;
  endDateTime: string;
  priorNoticeDelayInMinutes: number;
  facilityScheduleId: number;
  totalPrice: number;
  canReserve: {
    $id: string;
    value: boolean;
    validationResult: {
      entityType: string | null;
      extraParameter: string | null;
      parameters: string[];
      dateTimeParameters: any[];
      resultType: string;
      rule: string;
      warning: boolean;
    };
  };
  facilityPricingId: number;
};
