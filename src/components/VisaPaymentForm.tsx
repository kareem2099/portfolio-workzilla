'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface VisaPaymentFormProps {
  price: number;
}

export default function VisaPaymentForm({ price }: VisaPaymentFormProps) {
  return (
    <PayPalScriptProvider 
      options={{ 
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD"
      }}
    >
      <div className="mt-4">
        <PayPalButtons 
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: (price || 0).toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            if (!actions.order) {
              return Promise.reject(new Error("Order actions not available"));
            }
            return actions.order.capture().then((details) => {
              const name = details.payer?.name?.given_name || "customer";
              alert(`Transaction completed by ${name}`);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
