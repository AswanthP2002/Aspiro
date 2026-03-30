export const CertificateApiRoutes = {
  CERTIFICATES: {
    LOAD: '/v2/certificates/load',
    ADD: '/v2/certificate/add',
    DELETE: '/v2/certificate/:certificateId/delete',
  },
} as const;
