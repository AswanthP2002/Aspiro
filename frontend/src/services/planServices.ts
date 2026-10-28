import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { PlanApiEndpoints } from "../constants/endPoints/plan.endpoints"

export const createPlan = async (data: {[key: string]: string | number | boolean | string[]}) => {
        const response = await axiosInstance.post(PlanApiEndpoints.ADMIN.CREATE_PLAN, data,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminGetPlans = async (page: number, limit: number) => {
        const response = await axiosInstance.get(PlanApiEndpoints.ADMIN.GET_PLANS, 
            {
                params:{page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminDeletePlan = async (planId: string) => {
        const response = await axiosInstance.delete(PlanApiEndpoints.ADMIN.DELETE_PLAN_BY_ID(planId), 
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminEditPlan = async (planId: string, data: {[key: string]: string | number | string[] | boolean}) => {
        const response = await axiosInstance.put(PlanApiEndpoints.ADMIN.EDIT_PLAN_BY_ID(planId),
            data,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminTogglePlanListing = async (planId: string, status: 'LIST' | 'UNLIST') => {
        const response = await axiosInstance.patch(PlanApiEndpoints.ADMIN.TOGGLE_PLAN_LISTING_STATUS(planId),
            {},
            {
                params: {status},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const getPlansForUsers = async () => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.GET_PLANST, 
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const subscribeFreePlan = async (planId: string) => {
        const response = await axiosInstance.post(PlanApiEndpoints.USER.SUBSCRIBE_FREE_PLAN(planId), {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const subscribePaidPlan = async (planId: string, billingCycle: string) => {
        const response = await axiosInstance.post(PlanApiEndpoints.USER.SUBSCRIBE_PAID_PLAN(planId), {billingCycle},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const getSessionDetails = async (planId: string) => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.GET_SESSION_DETAILS(planId),
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminGetAnalytics = async (search: string, page: number, limit: number, status: string) => {
        const response = await axiosInstance.get('/v2/analytics/admin',
            {
                params:{search, page, limit, status},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const loadMySubscriptionDetails = async () => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.LOAD_MY_SUBSCRIPTION_DETAILS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const cancelSubscription = async (planId: string, subscriptionId: string) => {
        const response = await axiosInstance.patch(PlanApiEndpoints.USER.CANCEL_SUBSCRIPTION(planId, subscriptionId), {}, {
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
}

export const getUserSubscriptionDetails = async (userId: string) => {
        const response = await axiosInstance.get(PlanApiEndpoints.ADMIN.LOAD_USER_SUBSCRIPTION_DETAILS(userId), 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
}

export const getUserInvoices = async (stripeCustomerId: string) => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.GET_USER_INVOICES(stripeCustomerId),
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const manageSubscriptionPortal = async () => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.MANAGE_BILLING_PORTAL,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}


export const getPaymentMethods = async () => {
        const response = await axiosInstance.get(PlanApiEndpoints.USER.GET_PAYMENT_METHODS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
   
}

export const upgradeSubscription = async (currentSubscriptionId: string, upgradingPlanId: string) => {
        const response = await axiosInstance.patch(PlanApiEndpoints.USER.UPGRADE_SUBSCRIPTION(currentSubscriptionId, upgradingPlanId), {}, {
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
}


// export const cancelSubscription = async (planId: string, subscriptionId: string) => {
//     try {
//         const response = await axiosInstance.patch(PlanApiEndpoints.USER.CANCEL_SUBSCRIPTION(planId, subscriptionId),
//         {},
//         {
//             sendAuthToken: true
//         } as AxiosRequest
//     )

//     return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }
