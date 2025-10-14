export function transformTransaction(t, type) {
  switch (type) {
    case "hotel":
      return {
        ...t,
        hotel_name: t.transactionable?.hotel_name || `hotel ${t.transactionable.hotel_name}`,
        guest_name: t.transactionable?.user_id || `Guest ${t.transactionable.user_id}`,
        external_id: t.external_id || `EXT-HTL-${t.id.toString().padStart(3, "0")}`,
      };

    case "flight":
      return {
        ...t,
        flight_number: t.transactionable?.flight_number || `flight ${t.transactionable.flight_number}`,
        passenger_passenger_count: t.transactionable?.passenger_count || `Passenger ${t.transactionable.passenger_count}`,
        external_id: t.external_id || `EXT-FLT-${t.id.toString().padStart(3, "0")}`,
      };

    case "ppob":
      return {
        ...t,
        product_name: t.transactionable_type?.product || `ppob ${t.transactionable_type}`,
        customer_name: t.transactionable_type?.customer_name || `Customer ${t.id}`,
        external_id: t.external_id || `EXT-PPOB-${t.id.toString().padStart(3, "0")}`,
      };

    default:
      return t;
  }
}
