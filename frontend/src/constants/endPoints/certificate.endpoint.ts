export const CertificateEndpoints = {
    CERTIFICATES: {
    LOAD: '/v2/certificates/load',
    ADD: '/v2/certificate/add',
    DELETE: (certificateId: string) => `/v2/certificate/${certificateId}/delete`,
  },
} as const