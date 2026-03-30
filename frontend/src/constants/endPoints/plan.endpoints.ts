export const PlanApiEndpoints = {
  ADMIN: {
    CREATE_PLAN: '/v2/subscription/plan/create',
    GET_PLANS: '/v2/subscription/plans/load',
    DELETE_PLAN_BY_ID: (planId: string) => `/v2/subscription/plans/${planId}/delete`,
    EDIT_PLAN_BY_ID: (planId: string) => `/v2/subscription/plans/${planId}/edit`,
    TOGGLE_PLAN_LISTING_STATUS: (planId: string) => `/v2/subscription/plans/status-toggle/${planId}`,
    LOAD_ANAYTICS: '/v2/analytics/admin',
  },
  USER: {
    GET_PLANST: '/v2/plans/load',
    SUBSCRIBE_FREE_PLAN: (planId: string) => `/v2/plans/subscribe/free/${planId}`,
    SUBSCRIBE_PAID_PLAN: (planId: string) => `/v2/plans/subscribe/paid/${planId}`,
    GET_SESSION_DETAILS: (sessionId: string) => `/v2/plans/subscription/session/${sessionId}`,
    LOAD_MY_SUBSCRIPTION_DETAILS: '/v2/my-subscription',
    GET_USER_INVOICES: (stripeCustomerId: string) => `/v2/subscription/invoices/${stripeCustomerId}`,
    MANAGE_BILLING_PORTAL: '/v2/subscription/portal/create-session',
    GET_PAYMENT_METHODS: '/v2/subscriptions/payment-methods'
  },
} as const;
