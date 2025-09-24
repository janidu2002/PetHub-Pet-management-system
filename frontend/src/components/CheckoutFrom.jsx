import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import api from "../services/api.js";
import { useCart } from "../state/Cartcontext.jsx";

export default function CheckoutForm({ orderId, onPaid }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    api.post("/api/payments/intent", { orderId }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [orderId]);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      onPaid?.(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handlePay} style={{ maxWidth: 400 }}>
      <CardElement />
      <button disabled={!stripe || loading} type="submit">
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
