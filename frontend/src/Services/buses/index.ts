import { BUS_API } from "../busbase";
export interface BusStop {
  l: string[];
  v: string[];
  lt: any;
  ln: any;
  g: string[];
}
export interface StopInfo {
  AddressNo: string | null;
  Code: string | null;
  Lat: number | null;
  Lng: number | null;
  Name: string | null;
  Routes: string | null;
  Search: string | null;
  Status: string | null;
  StopId: number | null;
  StopType: string | null;
  Street: string | null;
  SupportDisability: string | null;
  Ward: string | null;
  Zone: string | null;
}

type ROUTES = {
  RouteId : string,
  RouteName : string,
  RouteNo : string,
};

const busApi = BUS_API.injectEndpoints({
  endpoints: (build) => ({
    getPath: build.query<any, string>({
      query: (path: string) => ({
        url: `pathfinding/getpathbystop/${path}`,
        responseHandler: (response) => {
          return response.text();
        },
      }),
    }),
    getStops: build.query<string, string>({
      query: () => ({
        url: `businfo/getstopsforautocomplete`,
        responseHandler: (response) => {
          return response.text();
        },
      }),
    }),
    getStopsLocation: build.query<string,string>({
      query: () => ({
        url: `businfo/getstoplocations`,
        responseHandler: (response) => {
          return response.text();
        },
      }),
    }),
    getStopsInbound: build.query<string, string>({
      query: (fromTo) => ({
        url: `businfo/getstopsinbounds/${fromTo}`,
        responseHandler: (response) => {
          return response.text();
        },
      }),
    }),
    getRouteThroughStation: build.query<string, string>({
      query: (path: string) => ({
        url: `businfo/getroutesthroughstop//${path}`,
        responseHandler: (response) => {
          return response.text();
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetPathQuery,
  useLazyGetStopsQuery,
  useGetStopsQuery,
  useGetStopsLocationQuery,
  useGetStopsInboundQuery,
  useLazyGetStopsInboundQuery,
  useLazyGetRouteThroughStationQuery
} = busApi;
