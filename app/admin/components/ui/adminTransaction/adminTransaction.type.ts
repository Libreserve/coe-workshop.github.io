export enum ResponseStatus {
  ApproveAll = "ApproveAll",
  Reject = "Reject",
  Approve = "Approve",
}

export interface AdminTransactionProps {
  responseStatus: ResponseStatus;
  setResponseStatus: (status: ResponseStatus) => void;
  message: string;
  onChange: (message: string) => void;
  onSubmit: () => void;
  toolTransaction: any;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}
