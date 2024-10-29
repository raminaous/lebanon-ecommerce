"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import styles from "../styles/ThankYouPage.module.css";

export default function ThankYouPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage if we are in the browser
      const storedOrderDetails = localStorage.getItem("orderDetails");
      if (storedOrderDetails) {
        setOrderDetails(JSON.parse(storedOrderDetails));
      } else {
        router.push("/"); // Redirect if orderDetails is missing
      }
    }
  }, [router]);

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Receipt", 10, 10);

    doc.setFontSize(12);
    doc.text(`Full Name: ${orderDetails?.fullName}`, 10, 30);
    doc.text(`Email: ${orderDetails?.email}`, 10, 40);
    doc.text(`Phone: ${orderDetails?.phone}`, 10, 50);
    doc.text(
      `Address: ${orderDetails?.address} ${
        orderDetails?.apartment ? `, ${orderDetails.apartment}` : ""
      }, ${orderDetails?.city}`,
      10,
      60
    );
    doc.text(`Total: $${orderDetails?.total}`, 10, 70);
    doc.text(`Payment Method: Mobile App`, 10, 80);
    doc.text(`Send money to: +961 03 001 418`, 10, 90);

    doc.text("Click here to pay on iOS:", 10, 100);
    doc.text(
      "https://itunes.apple.com/us/app/apple-store/id1284243483",
      10,
      110,
      {
        link: "https://itunes.apple.com/us/app/apple-store/id1284243483",
      }
    );

    doc.text("Click here to pay on Android:", 10, 120);
    doc.text(
      "https://play.google.com/store/apps/details?id=money.whish.android",
      10,
      130,
      {
        link: "https://play.google.com/store/apps/details?id=money.whish.android",
      }
    );

    doc.text(
      "Note: If payment is not completed or the correct amount is not sent, your order will not be processed.",
      10,
      140
    );

    doc.save("receipt.pdf");
  };

  return (
    <div className={styles.thankYouPageContainer}>
      <h1 className={styles.thankYouHeader}>Thank You for Your Order!</h1>
      <h2>Your Receipt:</h2>
      {orderDetails && (
        <div>
          <p>
            <strong>Full Name:</strong> {orderDetails.fullName}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderDetails.phone}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address}{" "}
            {orderDetails.apartment ? `, ${orderDetails.apartment}` : ""},{" "}
            {orderDetails.city}
          </p>
          <p>
            <strong>Total:</strong> ${orderDetails.total}
          </p>
          <p>
            <strong>Payment Method:</strong> Wish Money
          </p>
          <br />
          <h1>
            Send money to: <strong>+961 03 001 418 </strong>
          </h1>
          <br />
          <a
            href="https://itunes.apple.com/us/app/apple-store/id1284243483"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay on iOS
          </a>
          <br />
          <a
            href="https://play.google.com/store/apps/details?id=money.whish.android"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay on Android
          </a>
          <p className={styles.deliveryNotice}>
            * If payment is not completed or the correct amount is not sent,
            your order will not be processed and delivery will be delayed.
          </p>
        </div>
      )}
      <br />
      <button onClick={downloadReceipt} className={styles.downloadButton}>
        Download Receipt
      </button>
      <button onClick={() => router.push("/")} className={styles.homeButton}>
        Back to Home
      </button>
    </div>
  );
}
