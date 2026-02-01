// เผื่อไว้ใช้กับ state
import { RootState } from "../../store/store";

export const selectRegisterForm = (state: RootState) => state.register.form;
export const selectRegisterLoading = (state: RootState) => state.register.loading;
export const selectRegisterError = (state: RootState) => state.register.error;
