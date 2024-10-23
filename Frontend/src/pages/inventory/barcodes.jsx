import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import GenerateBarcode from "./barcodeGenerator.jsx";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    flexGrow: 1,
  },
});

const ViewBarcodes = ({ value, name, num }) => {
  let elems = [];
  for (let i = 0; i < num; i++) {
    elems.push(
      <View style={{ width: "30%", marginLeft: "10px", marginTop: "5px" }}>
        <GenerateBarcode value={value} name={name} />
      </View>
    );
  }
  return (
    <PDFViewer size="A4" width="1000" height="900">
      <Document
        title="Receipt"
        author="Subhan Shop"
        subject="vendor receipt"
        language="English"
        producer="Dev Team"
        pageMode="useAttachments"
      >
        <Page
          bookmark="POS System"
          orientation="potrait"
          size="A4"
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            margin: "0",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {elems?.map((e) => {
              console.log(e);
              return e;
            })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default ViewBarcodes;
