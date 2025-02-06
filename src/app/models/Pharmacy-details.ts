export interface PharmacyDetails {
    legalName: string;
    legalBusinessName: string;
    ncpdp:number;
    npi: number;
    deaNumber: string;
    deaExpDate: Date|null;
    stateLicenseNumber: string;
    licenseExpiryDate: Date;
    medicareProviderId: string;    
    storeNumber: string;   
    pmsSystem: string;
    otherPmsSystem: string;
   // pmsOutboundMethod: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    email: string;
    phoneNumber: string;
    fax: string;
    notes: string;
  }

  export interface PharmacistInformation {
    firstName: string;
    lastName: string;
    initials: string;
    email: string;
    isPharmacyContact:boolean;
    phoneNumber: string;
    role: string;
  }

  export interface StoreHours {
    alternateHours: string;
    holidays: Holiday[];
    days: Day[];
    additionalHolidays: string;
  }

  export interface Holiday {
    name: string;
    selected: boolean;
  }

  export interface Day {
    name: string;
    open: boolean;
    openTime:string;
    closeTime:string;
  }

  export interface Service {
    name: string;
    selected: boolean;
  }

  export interface shiping {
    name: string;
    selected: boolean;
  }

  export interface additionalLicenses{
    state: string;
    stateLicenseNumber: string;    
    expiryDate: Date; 
  }

  export interface ServiceDetails {
    servicesOffered:Service[];
    offerDelivery:string;
    deliveryDays:Day[];
    startTime:Date|null;
    endTime:Date|null;    
    pharmacyDeliveryBoundary: number;
    deliveryServices: string;
    deliveryServiceMethod: string;
    carrierName: string;
    pharmacyLocationNotes: string;
    shipRxOrders: string;
    preferredShippingCarrier: shiping[];
    workersCompensation: string;
    medicaidContracted: string;
    medicareContracted: string;    
    contractRestrictionDetails: string;
    pharmacyAccreditations: string[];
    gpo: string[];
    additionalLicenses: additionalLicenses[];
    terms:boolean;
  }

  export interface InsuranceContractDetails {
    psaoAffiliation: string;
    reportingtoIQVIA: string[];
    pbmContracts: string;
    shippingRetailPbmContract: string;
    dispensingFeesTerms: string;
    wholesalersInfo: string; 
  }

  export interface PharmacyInformation{
    pharmacyDetails:PharmacyDetails;
    pharmacistInformation:PharmacistInformation;
    storeHours:StoreHours;
    serviceDetails:ServiceDetails;
    insuranceContract:InsuranceContractDetails;
  }
  