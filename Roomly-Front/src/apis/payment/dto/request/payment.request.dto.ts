export interface PaymentRequestDto {
    
    pgMethod: string;
    payMethod: string;
    merchantUid: string;
    name: string;
    amount: number;
    guestId: string;
    guestName: string;
    telNumber: string;
    buyerPostcode: string;
    redirectUrl: string;
}