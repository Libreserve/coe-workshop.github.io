import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRequest } from "../../types";
import { apiSlice } from "../apiSlice";

// State
interface RegisterState {
  form: RegisterRequest | null;
  loading: boolean;
  error: string | null;
}

// initState
const initialState: RegisterState = {
  form: null,
  loading: false,
  error: null,
};

// Slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterForm(state, action: PayloadAction<RegisterRequest>) {
      state.form = action.payload;
    },
    clearRegisterForm(state) {
      state.form = null;
      state.error = null;
    },
  },
});

export const { setRegisterForm, clearRegisterForm } = registerSlice.actions;
export default registerSlice.reducer;

// RTK Query endpoint
export const apiSliceWithRegister = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<object, RegisterRequest>({
      query: (form) => ({
        url: "/v1/auth/register",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["register"],
    }),
  }),
});

export const { useRegisterUserMutation } = apiSliceWithRegister;
