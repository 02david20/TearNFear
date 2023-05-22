import { BUS_API } from "../busbase";
export interface BusStop {
  l : string[],
  v : string[],
  lt: any,
  ln: any,
  g : string[],
}
const busApi = BUS_API.injectEndpoints({
  endpoints: (build) => ({
    getPath: build.query<any,string>({
      query: (path:string) => ({
        url: `pathfinding/getpathbystop/${path}`,
        responseHandler: (response) => {
          return response.text()
        }
      }), 
    }),
    getStops: build.query<BusStop,string>({
      query: () => ({
        url: `businfo/getstopsforautocomplete`,
        responseHandler: (response) => {
          return response.text()
        }
      }), 
    }),
    getStopsLocation: build.query<BusStop,string>({
      query: () => ({
        url: `businfo/getstoplocations`,
        responseHandler: (response) => {
          return response.text()
        }
      }), 
    }),

  }),
  overrideExisting: true,
});

export const { useLazyGetPathQuery, useLazyGetStopsQuery, useGetStopsQuery, useGetStopsLocationQuery } = busApi;
