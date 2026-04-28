import { apiSlice } from "../apiSlice";
import { Report, CreateReportRequest, UpdateReportStatusRequest, ReportStatus, ReportType } from "@/app/types/api/report";

export const apiSliceWithReports = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation<Report, CreateReportRequest>({
      query: (body) => ({
        url: "/reports",
        method: "POST",
        body,
      }),
    }),
    getReports: builder.query<Report[], { status?: ReportStatus; type?: ReportType }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.set("status", params.status);
        if (params?.type) searchParams.set("type", params.type);
        return `/reports?${searchParams.toString()}`;
      },
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: ["Report"],
    }),
    updateReportStatus: builder.mutation<Report, { id: number; status: ReportStatus }>({
      query: ({ id, status }) => ({
        url: `/reports/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Report"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateReportMutation,
  useGetReportsQuery,
  useUpdateReportStatusMutation,
} = apiSliceWithReports;