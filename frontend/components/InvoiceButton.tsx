"use client";

import jsPDF from "jspdf";
import toast from "react-hot-toast";
export default function InvoiceButton() {

  const downloadInvoice = async () => {

    const pickup =
      localStorage.getItem("pickup") || "N/A";

    const destination =
      localStorage.getItem("destination") || "N/A";

    const fare =
      localStorage.getItem("fare") || "0";

    const email =
      localStorage.getItem("email");

    const driver =
      JSON.parse(
        localStorage.getItem("driver") || "{}"
      );

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("FairFare AI Invoice", 20, 20);

    doc.setFontSize(12);

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      40
    );

    doc.text(
      `Pickup: ${pickup}`,
      20,
      60
    );

    doc.text(
      `Destination: ${destination}`,
      20,
      80
    );

    doc.text(
      `Driver: ${driver.name || "N/A"}`,
      20,
      100
    );

    doc.text(
      `Vehicle: ${driver.vehicle || "N/A"}`,
      20,
      120
    );

    doc.text(
      `Fare Paid: ₹${fare}`,
      20,
      140
    );

    doc.setFontSize(14);

    doc.text(
      "Thank you for choosing FairFare AI!",
      20,
      180
    );

    doc.save("FairFare-Invoice.pdf");

    try {

      if (email) {

        await fetch(
          `http://localhost:8000/send-receipt/${email}`,
          {
            method: "POST"
          }
        );

        toast.success("Invoice downloaded and receipt sent");

      }

    } catch (error) {

      console.error(error);

      toast.error("Email sending failed");

    }

  };

  return (

    <button
      onClick={downloadInvoice}
      className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
    >
      Download Invoice
    </button>

  );

}