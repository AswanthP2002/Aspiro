export default interface InvoiceDTO {
  id?: string;
  amount?: number;
  status?: string;
  date?: string | Date;
  downloadUrl?: string;
  hostedUrl?: string;
}
