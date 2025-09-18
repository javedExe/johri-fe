import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDF from './InvoicePDF';
import InvoicePDF from '../../../../utils/InvoicePDF';

const invoiceData = {
  invoiceNo: "27ABCDE1234F1Z5",
  invoiceDate: "2025-09-10",
  orderId: "ORD-784512",
  billedTo: {
    name: "Mr. Arjun Mehta",
    address: "B-402, Lotus Residency, Andheri West Mumbai, Maharashtra – 400053",
    email: "arjun.mehta@example.com",
    phone: "+91-9123456780"
  },
  shippedTo: {
    name: "Mr. Shivam Mehta",
    address: "Warehouse 5, Industrial Area, Kolkata, West Bengal - 700089",
    email: "shivam.mehta@example.com",
    phone: "+91-8123456799"
  },
  soldBy: "Shree Radha Jewellers Pvt. Ltd., Shop No. 12, Gold Plaza, Zaveri Bazaar Mumbai, Maharashtra - 400002, sales@shreeradhajewels.com, +91-9876543210",
  panNo: "27ABCDE1234F1Z5",
  gstNo: "ABCDE1234F",
  paymentMode: "NEFT",
  transactionId: "NEFT-AXIS-20250910-78945",
  items: [
    {
      description: "22K Gold Ring - 5 grams (GOLD-RNG-001), SKU: GR-22K-5G",
      hsn: "71131910",
      qty: 1,
      unitPrice: "32,000",
      gstPercent: "3%",
      cgst: "480",
      sgst: "480",
      total: "32,960"
    },
    {
      description: "Sterling Silver Chain - 50 grams (SIL-CHN-002), SKU: SC-925-50G",
      hsn: "71131110",
      qty: 1,
      unitPrice: "3,500",
      gstPercent: "3%",
      cgst: "52",
      sgst: "52",
      total: "3,605"
    }
  ],
  subTotal: "35,500.00",
  totalGST: "1,065.00",
  grandTotal: "36,565.00",
  roundOff: "-0.65",
  finalAmount: "36,564.35"
};

function InvoicePdfButton({ children }) {
  return (
    <PDFDownloadLink 
      document={<InvoicePDF data={invoiceData} />} 
      fileName={`Invoice-${invoiceData.invoiceNo}.pdf`}
    >
      {/* {({ loading }) => loading ? "Generating PDF..." : "Download Invoice PDF"} */}
        { children }
    </PDFDownloadLink>
  );
}


export default InvoicePdfButton;