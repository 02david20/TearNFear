import { BUS_API } from "../busbase";


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
  }),
  overrideExisting: true,
});

export const { useLazyGetPathQuery } = busApi;
