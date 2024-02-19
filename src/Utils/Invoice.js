import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    table: {
        display: 'table',
        width: '45%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    table2: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: 'row',
        textAlign: 'left'
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 12,
        paddingLeft: 5
    },
    image: {
        width: 50,
        height: 50
    }
});
const Invoice = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{order.id}- {order.name}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{order.address}</Text>
                    <Text>Order Details:</Text>
                    <View>
                        {
                            order?.order_detail?.map((item, index) => {
                                return (
                                    <>
                                        <Text key={index}>
                                            <Text style={{ color: "red", fontSize: "28px" }}>
                                                {item.product_name}
                                            </Text>
                                        </Text>
                                    </>
                                )
                            })
                        }
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Invoice
