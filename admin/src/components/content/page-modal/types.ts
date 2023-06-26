import type { IForm } from '../page-form/types';

export interface IModal {
  pageTitle?: string;
  modalFormOptions: IForm;
  width?: number | string;
}
