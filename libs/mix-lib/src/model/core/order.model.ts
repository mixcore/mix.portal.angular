export interface MixOrder {
  id: number;
  createdDateTime: string;
  lastModified: string;
  mixTenantId: number;
  createdBy: number;
  modifiedBy: number;
  priority: number;
  status: string;
  isDeleted: boolean;
  metadataId: number;
  contentId: number;
  contentType: number;
  action: number;
  code: string;
  name: number;
  currency: string;
  fullName: number;
  description: string;
  modelInformation: number;
  tempid: string;
  instagram?: string;
  email: string;
  orderStatus: OrderStatus;
  paymentGateway: PaymentGateway;
  paymentResponse: any;
  paymentStatus: string;
  title: string;
  total: number;
  userId: string;
  deliveryCode: string;
  shippingAddress: ShippingAddress;
}

export interface OrderItem {
  sku: string;
  price: number;
  image: string;
  title: string;
  currency: string;
  description: string;
  discount: number;
  quantity: number;
  total: number;
  itemType: 'PRODUCT' | 'SHIPPING' | 'PROMOTION';
  color?: string;
  colorCode?: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  street: string;
  district: string;
  city: string;
  province: string;
  ward: string;
  countryCode: string;
  postalCode: string;
}

export enum PaymentGateway {
  All = 'All',
  Paypal = 'Paypal',
  OnePay = 'Onepay',
  MoMo = 'MoMo',
}

export enum OrderStatus {
  All = 'All',
  NEW = 'NEW',
  WaitingPay = 'WAITING_FOR_PAYMENT',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SHIPPING_FAILED = 'SHIPPING_FAILED',
}

export const OrderStatusDisplay: Record<OrderStatus, string> = {
  [OrderStatus.NEW]: 'New',
  [OrderStatus.WaitingPay]: 'Waiting For Payment',
  [OrderStatus.CANCELED]: 'Canceled',
  [OrderStatus.PAID]: 'Paid',
  [OrderStatus.SHIPPING]: 'Shipping',
  [OrderStatus.SUCCESS]: 'Success',
  [OrderStatus.PAYMENT_FAILED]: 'Payment Fail',
  [OrderStatus.SHIPPING_FAILED]: 'Shipping Fail',
  [OrderStatus.All]: 'All',
};

export interface MixPromotion {
  id: number;
  createdDateTime: string;
  lastModified: string;
  mixTenantId: number;
  createdBy: string;
  modifiedBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
  title: string;
  code: string;
  description: string;
  promotionType: string;
  totalUsed: number | null;
  maxAllowed: number;
  fromDate: string | null;
  toDate: string | null;
  discountPercent: number;
  discountValue: number;
  currency: string;
  minTotalBill: number;
  maxTotalBill: number;
  allowDiscountProduct: boolean;
  assignedUserOnly: boolean;
  maxDiscountValue: number | null;
}

export interface PromotionProcessed {
  promotion: MixPromotion;
  discountFinalValue: number;
}

export function processProductPromotion(
  value: MixPromotion[],
  totalPrice: number,
  shippingFee = 0
): PromotionProcessed[] {
  if (!value.length) return [];

  const promotionProcessed = value.map((promotion) => {
    let discountValue = 0;
    if (promotion.promotionType === 'Voucher') {
      discountValue = promotion.discountValue;
    }

    if (promotion.promotionType === 'Coupon') {
      discountValue = (totalPrice / 100) * promotion.discountPercent;

      if (
        promotion.maxDiscountValue &&
        promotion.maxDiscountValue > 0 &&
        discountValue >= promotion.maxDiscountValue
      ) {
        discountValue = promotion.maxDiscountValue;
      }
    }

    if (promotion.promotionType === 'FreeShipping') {
      discountValue = shippingFee;

      if (
        promotion.maxDiscountValue &&
        promotion.maxDiscountValue > 0 &&
        discountValue >= promotion.maxDiscountValue
      ) {
        discountValue = promotion.maxDiscountValue;
      }
    }

    return <PromotionProcessed>{
      promotion: promotion,
      discountFinalValue: discountValue,
    };
  });

  return promotionProcessed;
}
