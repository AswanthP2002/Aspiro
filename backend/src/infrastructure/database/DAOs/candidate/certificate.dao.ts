import { model } from "mongoose";
import Certificates from "../../../../domain/entities/candidate/certificates";
import { CertificateSchema } from "../../Schemas/candidate/certificate.schema";

export const CertificateDAO = model<Certificates>('certificate', CertificateSchema)