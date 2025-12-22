import dayjs from "dayjs";

export function DeliveryDate({ cartItem, deliveryOptions }) {
  if (!cartItem?.deliveryOptionId || !deliveryOptions?.length) {
    return <div className="delivery-date">Delivery date: TBD</div>;
  }

  const selectedDeliveryOption = deliveryOptions.find(
    (option) => option.id === cartItem.deliveryOptionId
  );

  if (!selectedDeliveryOption?.estimatedDeliveryTimeMs) {
    return <div className="delivery-date">Delivery date: Not available</div>;
  }

  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('ddd, MMMM D')}
    </div>
  );
}

