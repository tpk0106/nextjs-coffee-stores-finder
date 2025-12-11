type MapBoxType = {
  id: string;
  geometry: {
    coordinates: string[];
  };
  type: string;
  properties: {
    full_address: string;
    name: string;
    name_preferred: string;
    feature_type: string;
  };
};

type CoffeeStoreType = {
  id: string;
  imageUrl: string;
  address: string;
  name: string;
  voting: number;
};

type AirtableRecordType = {
  id: string;
  recordId: string;
  fields: CoffeeStoreType[];
};

type serverParamsType = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
};

export type {
  MapBoxType,
  CoffeeStoreType,
  AirtableRecordType,
  serverParamsType,
};
