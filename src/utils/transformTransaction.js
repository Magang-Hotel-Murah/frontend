export function transformTransaction(t, type) {
  switch (type) {
    case "hotel":
      return {
        ...t,
        hotel_name: t.transactionable?.name || `Hotel ${t.transactionable_id}`,
        guest_name: t.transactionable?.guest_name || `Guest ${t.id}`,
        external_id: t.external_id || `EXT-HTL-${t.id.toString().padStart(3, "0")}`,
      };

    case "flight":
      return {
        ...t,
        airline_name: t.transactionable?.airline || `Airline ${t.transactionable_id}`,
        passenger_name: t.transactionable?.passenger_name || `Passenger ${t.id}`,
        external_id: t.external_id || `EXT-FLT-${t.id.toString().padStart(3, "0")}`,
      };

    case "ppob":
      return {
        ...t,
        product_name: t.transactionable?.product || `Product ${t.transactionable_id}`,
        customer_name: t.transactionable?.customer_name || `Customer ${t.id}`,
        external_id: t.external_id || `EXT-PPOB-${t.id.toString().padStart(3, "0")}`,
      };

    default:
      return t;
  }
}
