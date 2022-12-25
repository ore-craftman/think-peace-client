interface BaseSchema {
  name: string;
  country: string;
  position: { lat: number; lng: number };
}

export interface WishSchema {
  from: BaseSchema;
  to: BaseSchema;
}
