export class SubscriptionStatus {
    isSubscribed: boolean;
    startDate: string;
    endDate: string;

    constructor (subscriptionStatus: SubscriptionStatus) {
        this.isSubscribed = subscriptionStatus.isSubscribed;
        this.startDate = subscriptionStatus.startDate;
        this.endDate = subscriptionStatus.endDate;
    }
}
