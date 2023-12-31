import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment({selectedAddr}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL_API}/payment/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL_API}/payment/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
    <div className="p-2 ">
     <h5 className="m-2  p-2 text-capitilize text-green  ">Summary</h5>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} selectedAddr={selectedAddr}/>
        </Elements>
      )}
      </div>
    </>
  );
}

export default Payment;
