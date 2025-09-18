import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: 'Helvetica', color: '#333' },
  heading: { fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  section: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { flexDirection: 'column' },
  label: { fontWeight: 'bold', marginBottom: 2 },
  infoText: { marginBottom: 2, lineHeight: 1.2 },

  /* Billed To & Shipped To Container */
  addressesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  addressBlock: { width: '48%' },

  /* Table Styles */
  tableContainer: { borderWidth: 1, borderColor: '#aaa', borderRadius: 2 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  cell: {
    paddingHorizontal: 4,
    fontSize: 8,
  },
  cellSmall: {
    paddingHorizontal: 4,
    fontSize: 8,
    flexGrow: 0,
    flexShrink: 0,
    textAlign: 'center',
  },

  colSrNo: { width: '5%' },
  colDescription: { width: '40%' },
  colHSN: { width: '8%', textAlign: 'center' },
  colQty: { width: '5%', textAlign: 'center' },
  colUnitPrice: { width: '12%', textAlign: 'right' },
  colGST: { width: '6%', textAlign: 'center' },
  colCGST: { width: '6%', textAlign: 'right' },
  colSGST: { width: '6%', textAlign: 'right' },
  colTotal: { width: '12%', textAlign: 'right' },

  totalsContainer: { marginTop: 10, alignItems: 'flex-end' },
  totalLine: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 2 },
  totalLabel: { width: '30%', textAlign: 'right', fontWeight: 'bold' },
  totalValue: { width: '15%', textAlign: 'right' },

  footerText: { marginTop: 15, fontSize: 8, textAlign: 'center' },
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>TAX INVOICE</Text>

      {/* Invoice & Order Info */}
      <View style={[styles.row, styles.section]}>
        <View>
          <Text style={styles.label}>Invoice No:</Text>
          <Text>{data.invoiceNo}</Text>
        </View>
        <View>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text>{data.invoiceDate}</Text>
        </View>
        <View>
          <Text style={styles.label}>Order Id:</Text>
          <Text>{data.orderId}</Text>
        </View>
      </View>

      {/* Billed To & Shipped To */}
      <View style={styles.addressesContainer}>
        <View style={styles.addressBlock}>
          <Text style={styles.label}>Billed To:</Text>
          <Text style={styles.infoText}>{data.billedTo.name}</Text>
          <Text style={styles.infoText}>{data.billedTo.address}</Text>
          <Text style={styles.infoText}>{data.billedTo.email}</Text>
          <Text style={styles.infoText}>{data.billedTo.phone}</Text>
        </View>

        <View style={styles.addressBlock}>
          <Text style={styles.label}>Shipped To:</Text>
          <Text style={styles.infoText}>{data.shippedTo.name}</Text>
          <Text style={styles.infoText}>{data.shippedTo.address}</Text>
          <Text style={styles.infoText}>{data.shippedTo.email}</Text>
          <Text style={styles.infoText}>{data.shippedTo.phone}</Text>
        </View>
      </View>

      {/* Seller Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Sold By:</Text>
        <Text style={styles.infoText}>{data.soldBy}</Text>
        <Text>PAN No: {data.panNo}</Text>
        <Text>GST No: {data.gstNo}</Text>
        <Text>Payment Mode: {data.paymentMode}</Text>
        <Text>Transaction ID: {data.transactionId}</Text>
      </View>

      {/* Item Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cellSmall, styles.colSrNo]}>Sr. No.</Text>
          <Text style={[styles.cell, styles.colDescription]}>Description/Product ID</Text>
          <Text style={[styles.cellSmall, styles.colHSN]}>HSN</Text>
          <Text style={[styles.cellSmall, styles.colQty]}>Qty</Text>
          <Text style={[styles.cellSmall, styles.colUnitPrice]}>Unit Price</Text>
          <Text style={[styles.cellSmall, styles.colGST]}>GST</Text>
          <Text style={[styles.cellSmall, styles.colCGST]}>CGST</Text>
          <Text style={[styles.cellSmall, styles.colSGST]}>SGST</Text>
          <Text style={[styles.cellSmall, styles.colTotal]}>Total</Text>
        </View>

        {/* Table Rows */}
        {data.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cellSmall, styles.colSrNo]}>{idx + 1}</Text>
            <Text style={[styles.cell, styles.colDescription]}>{item.description}</Text>
            <Text style={[styles.cellSmall, styles.colHSN]}>{item.hsn}</Text>
            <Text style={[styles.cellSmall, styles.colQty]}>{item.qty}</Text>
            <Text style={[styles.cellSmall, styles.colUnitPrice]}>{item.unitPrice}</Text>
            <Text style={[styles.cellSmall, styles.colGST]}>{item.gstPercent}</Text>
            <Text style={[styles.cellSmall, styles.colCGST]}>{item.cgst}</Text>
            <Text style={[styles.cellSmall, styles.colSGST]}>{item.sgst}</Text>
            <Text style={[styles.cellSmall, styles.colTotal]}>{item.total}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalLine}>
          <Text style={styles.totalLabel}>Sub-Total:</Text>
          <Text style={styles.totalValue}>₹ {data.subTotal}</Text>
        </View>
        <View style={styles.totalLine}>
          <Text style={styles.totalLabel}>Total GST:</Text>
          <Text style={styles.totalValue}>₹ {data.totalGST}</Text>
        </View>
        <View style={styles.totalLine}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalValue}>₹ {data.grandTotal}</Text>
        </View>
        <View style={styles.totalLine}>
          <Text style={styles.totalLabel}>Round-Off:</Text>
          <Text style={styles.totalValue}>{data.roundOff}</Text>
        </View>
        <View style={styles.totalLine}>
          <Text style={styles.totalLabel}>Final Amount:</Text>
          <Text style={styles.totalValue}>₹ {data.finalAmount}</Text>
        </View>
      </View>

      <Text style={styles.footerText}>
        Thank you for your business. Terms &amp; Conditions: See site.
      </Text>
    </Page>
  </Document>
);

export default InvoicePDF;