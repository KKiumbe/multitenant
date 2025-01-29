/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/signup`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/assignTasks` | `/assignTasks`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/collection` | `/collection`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/customers` | `/customers`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/invoices` | `/invoices`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/payments` | `/payments`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/receipting` | `/receipting`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/reports` | `/reports`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/tasks` | `/tasks`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/users` | `/users`; params?: Router.UnknownInputParams; } | { pathname: `/bulkSMS/sendsms`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/RequestOtpPage`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/changePassword`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/forgotPassword`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/verifyOTP`; params?: Router.UnknownInputParams; } | { pathname: `/companyprofile/CompanyProfile`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/create`; params?: Router.UnknownInputParams; } | { pathname: `/receipt/id`; params?: Router.UnknownInputParams; } | { pathname: `/smsDelivery/delivery`; params?: Router.UnknownInputParams; } | { pathname: `/customer/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/invoices/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/payment/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/receipt/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/tasks/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/users/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/login`; params?: Router.UnknownOutputParams; } | { pathname: `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/signup`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/assignTasks` | `/assignTasks`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/collection` | `/collection`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/customers` | `/customers`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/invoices` | `/invoices`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/payments` | `/payments`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/receipting` | `/receipting`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/reports` | `/reports`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/tasks` | `/tasks`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/users` | `/users`; params?: Router.UnknownOutputParams; } | { pathname: `/bulkSMS/sendsms`; params?: Router.UnknownOutputParams; } | { pathname: `/changePassword/RequestOtpPage`; params?: Router.UnknownOutputParams; } | { pathname: `/changePassword/changePassword`; params?: Router.UnknownOutputParams; } | { pathname: `/changePassword/forgotPassword`; params?: Router.UnknownOutputParams; } | { pathname: `/changePassword/verifyOTP`; params?: Router.UnknownOutputParams; } | { pathname: `/companyprofile/CompanyProfile`; params?: Router.UnknownOutputParams; } | { pathname: `/invoices/create`; params?: Router.UnknownOutputParams; } | { pathname: `/receipt/id`; params?: Router.UnknownOutputParams; } | { pathname: `/smsDelivery/delivery`; params?: Router.UnknownOutputParams; } | { pathname: `/customer/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/invoices/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/payment/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/receipt/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/tasks/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/users/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/login${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `/signup${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/assignTasks${`?${string}` | `#${string}` | ''}` | `/assignTasks${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/collection${`?${string}` | `#${string}` | ''}` | `/collection${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/customers${`?${string}` | `#${string}` | ''}` | `/customers${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/invoices${`?${string}` | `#${string}` | ''}` | `/invoices${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/payments${`?${string}` | `#${string}` | ''}` | `/payments${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/receipting${`?${string}` | `#${string}` | ''}` | `/receipting${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/reports${`?${string}` | `#${string}` | ''}` | `/reports${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/tasks${`?${string}` | `#${string}` | ''}` | `/tasks${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/users${`?${string}` | `#${string}` | ''}` | `/users${`?${string}` | `#${string}` | ''}` | `/bulkSMS/sendsms${`?${string}` | `#${string}` | ''}` | `/changePassword/RequestOtpPage${`?${string}` | `#${string}` | ''}` | `/changePassword/changePassword${`?${string}` | `#${string}` | ''}` | `/changePassword/forgotPassword${`?${string}` | `#${string}` | ''}` | `/changePassword/verifyOTP${`?${string}` | `#${string}` | ''}` | `/companyprofile/CompanyProfile${`?${string}` | `#${string}` | ''}` | `/invoices/create${`?${string}` | `#${string}` | ''}` | `/receipt/id${`?${string}` | `#${string}` | ''}` | `/smsDelivery/delivery${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/signup`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/assignTasks` | `/assignTasks`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/collection` | `/collection`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/customers` | `/customers`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/invoices` | `/invoices`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/payments` | `/payments`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/receipting` | `/receipting`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/reports` | `/reports`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/tasks` | `/tasks`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/users` | `/users`; params?: Router.UnknownInputParams; } | { pathname: `/bulkSMS/sendsms`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/RequestOtpPage`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/changePassword`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/forgotPassword`; params?: Router.UnknownInputParams; } | { pathname: `/changePassword/verifyOTP`; params?: Router.UnknownInputParams; } | { pathname: `/companyprofile/CompanyProfile`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/create`; params?: Router.UnknownInputParams; } | { pathname: `/receipt/id`; params?: Router.UnknownInputParams; } | { pathname: `/smsDelivery/delivery`; params?: Router.UnknownInputParams; } | `/customer/${Router.SingleRoutePart<T>}` | `/invoices/${Router.SingleRoutePart<T>}` | `/payment/${Router.SingleRoutePart<T>}` | `/receipt/${Router.SingleRoutePart<T>}` | `/tasks/${Router.SingleRoutePart<T>}` | `/users/${Router.SingleRoutePart<T>}` | { pathname: `/customer/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/invoices/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/payment/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/receipt/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/tasks/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/users/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
