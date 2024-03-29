import React, { Fragment, useEffect } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import mechx from "../images/mechx.png";

const Invoice = ({ order }) => {
  console.log("all ", order);

  // Input date string
  var dateString = order?.created_at;
  // Create a Date object from the input string
  var dateObject = new Date(dateString);

  // Extract the components of the date
  var day = dateObject.getUTCDate();
  var month = dateObject.getUTCMonth() + 1; // Months are zero-based, so add 1
  var year = dateObject.getUTCFullYear();

  // Format the date as DD/MM/YYYY
  var formattedDate =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    year;

  // Output the formatted date
  // console.log(formattedDate);

  const reciept_data = {
    id: "642be0b4bbe5d71a5341dfb1",
    invoice_no: "20200669",
    address: "739 Porter Avenue, Cade, Missouri, 1134",
    date: "24-09-2019",
    items: [
      {
        id: 1,
        desc: "do ex anim quis velit excepteur non",
        qty: 8,
        price: 179.25,
      },
      {
        id: 2,
        desc: "incididunt cillum fugiat aliqua Lorem sit Lorem",
        qty: 9,
        price: 107.78,
      },
      {
        id: 3,
        desc: "quis Lorem ad laboris proident aliqua laborum",
        qty: 4,
        price: 181.62,
      },
      {
        id: 4,
        desc: "exercitation non do eu ea ullamco cillum",
        qty: 4,
        price: 604.55,
      },
      {
        id: 5,
        desc: "ea nisi non excepteur irure Lorem voluptate",
        qty: 6,
        price: 687.08,
      },
    ],
  };

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: { fontSize: 12, fontStyle: "bold" },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      textTransform:"capitalize"
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={mechx} alt="Mech-x" />
        <Text style={styles.reportTitle}>Mech-X Enterprises</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Invoice</Text>
          {/* {order?.order_detail?.map((e) => {
            return (
              <Fragment key={e?.id}>
                <Text style={styles.invoiceNumber}>
                  Invoice Number: {e?.order_id}
                </Text>
              </Fragment>
            );
          })} */}
          <Fragment>
            <Text style={styles.invoiceNumber}>Invoice Number: #{order.id}</Text>
          </Fragment>
        </View>

        <View>
          {/* <Text style={styles.addressTitle}>Order Date: {formattedDate}</Text> */}
          <Text style={styles.addressTitle}>{order?.name} </Text>
          <Text style={styles.invoiceNumber}>Email: {order.email}</Text>
          <Text style={styles.invoiceNumber}>Order Date: {formattedDate}</Text>
          {/* {order?.policy_number && (
            <Text style={styles.addressTitle}>
              Policy Number : {order?.policy_number}
            </Text>
          )} */}
          {/* <Text style={styles.addressTitle}>Lagos, Nigeria.</Text> */}
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 300 }}>
          <Text style={styles.addressTitle}>Shipping Address: </Text>
          <Text style={styles.address}>{order?.addresses?.address},</Text>
          <Text style={styles.address}>{order?.addresses?.city},</Text>
          <Text style={styles.address}>{order?.addresses?.country},</Text>
          <Text style={styles.address}>{order?.addresses?.pincode}.</Text>
          <Text style={styles.address}>Mo:{order?.addresses?.mobile}</Text>
          {order?.policy_number && (
            <Fragment key={order?.id}>
              <Text
                style={{
                  borderBottom: "1px solid #3E3E3E",
                  margin: "10px 0px",
                }}
              ></Text>
              <Text style={styles.addressTitle}>
                Policy Number : {order?.policy_number}
              </Text>
              <Text style={styles.addressTitle}>
                Insurance Company : {order?.insurance?.name}
              </Text>
            </Fragment>
          )}
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Items</Text>
      </View>
      <View style={styles.theader}>
        <Text>Price</Text>
      </View>
      <View style={styles.theader}>
        <Text>Qty</Text>
      </View>
      <View style={styles.theader}>
        <Text>Amount</Text>
      </View>
    </View>
  );

  // const TableBody = () =>
  //   reciept_data.items.map((receipt) => (
  //     <Fragment key={receipt.id}>
  //       <View style={{ width: "100%", flexDirection: "row" }}>
  //         <View style={[styles.tbody, styles.tbody2]}>
  //           <Text>{receipt.desc}</Text>
  //         </View>
  //         <View style={styles.tbody}>
  //           <Text>{receipt.price} </Text>
  //         </View>
  //         <View style={styles.tbody}>
  //           <Text>{receipt.qty}</Text>
  //         </View>
  //         <View style={styles.tbody}>
  //           <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>
  //         </View>
  //       </View>
  //     </Fragment>
  //   ));
  const TableBody2 = () =>
    order?.order_detail?.map((receipt) => {
      return (
        <Fragment key={receipt.id}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={[styles.tbody, styles.tbody2]}>
              <Text>
                {receipt.product_name} ({receipt.pn})
              </Text>
            </View>
            <View style={styles.tbody}>
              <Text>{receipt.price}/- </Text>
            </View>
            <View style={styles.tbody}>
              <Text>{receipt.qty}</Text>
            </View>
            <View style={styles.tbody}>
              <Text>{(receipt.price * receipt.qty).toFixed(2)}/-</Text>
            </View>
          </View>
        </Fragment>
      );
    });

  const SubTableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text> </Text>
      </View>
      <View style={styles.tbody}>
        <Text>SubTotal</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{parseFloat(order?.total_amount).toFixed(2)}/-</Text>
      </View>
    </View>
  );

  const TableDiscount = () => {
    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.total}>
          <Text></Text>
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>Discount</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{order?.coupon_value ? parseFloat(order?.coupon_value).toFixed(2) + "/-" : "-"}</Text>
        </View>
      </View>
    );
  };
  const TableTotal = () => {
    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.total}>
          <Text></Text>
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>Total</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{parseFloat(order?.total_amount - order?.coupon_value).toFixed(2)}/-</Text>
        </View>
      </View>
    );
  };

  // footer
  const TableFooter = () => (
    <Fragment>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          // border: "1px solid black",
          marginTop: "30px",
        }}
      >
        <View style={styles.tbody}>
          <Text style={{ fontWeight: "bold" }}>Payment:</Text>
          <Text>{(order?.payment_status)}</Text>
        </View>
        <View style={styles.tbody}>
          <Text style={{ fontWeight: "bold" }}>Mode of Payment:</Text>
          <Text>Razorpay</Text>
        </View>
        <View style={styles.tbody}>
          <Text style={{ fontWeight: "bold" }}>Invoice Value:</Text>
          <Text>{parseFloat(order?.total_amount - order?.coupon_value).toFixed(2)}/-</Text>
        </View>
      </View>
    </Fragment>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        {/* <TableBody /> */}
        <TableBody2 />
        <SubTableTotal />
        <TableDiscount />
        <TableTotal />
        <hr />
        {/* <TableHeadFooter /> */}
        <TableFooter />
      </Page>
    </Document>
  );
};
export default Invoice;
