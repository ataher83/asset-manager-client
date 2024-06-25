import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  logo: {
    width: 50, // set the desired width
    height: 'auto', // maintain the aspect ratio
    marginBottom: 10, // space between logo and header text
  },
});

const MyAssetPDF = ({ request, user, companyName, companyLogo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={companyLogo} alt="companyLogo" style={styles.logo} />
        <Text style={styles.header}>{companyName}</Text>
        <Text>Asset Details</Text>
        <Text>Asset Name: {request.assetName}</Text>
        <Text>Asset Type: {request.assetType}</Text>
        <Text>Request Date: {request.assetRequestDate}</Text>
        <Text>Approval Date: {request.assetRequestApprovalDate}</Text>
        <Text>Requested By: {user.name}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.footer}>
        <Text>
          Printed on{' '}
          {new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }) +
            ', ' +
            new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })}
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyAssetPDF;
