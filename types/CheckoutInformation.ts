export type CheckoutInformation = {
    creditCardNumber: string;
    expiryDate: {
        month: string;
        year: string;
    };
    cvv: string;
    nameOnCard: string;
    shippingName: string;
    shippingCountry: string;
}