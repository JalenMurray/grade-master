import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import VModal from '../../VModal';
import { useContext } from 'react';
import { ClassContext } from '../../../contexts/class';
import { formatFloat } from '../../../utils/utils';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'col',
    backgroundColor: '#FFFFFF',
  },
  default: { margin: 10, padding: 10, flexGrow: 1 },
  title: {
    margin: 10,
    padding: 10,
    fontSize: '24px',
  },
  assignmentRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginTop: '20px',
    width: '100%',
  },
});

function PDFModal({ open, setOpen }) {
  const { cls, assignmentTypes } = useContext(ClassContext);

  const LineBreak = (
    <View>
      <Text>----------------------------------------------------------------------------------------</Text>
    </View>
  );

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="pdf-modal"
      header={'Downloadable Report'}
      body={
        <PDFViewer height={'100%'} width={'100%'}>
          <Document pageLayout="oneColumn">
            <Page style={styles.page}>
              <View style={styles.title}>
                <Text>
                  Report for
                  <Text>
                    {cls.code} {cls.title}
                  </Text>
                </Text>
              </View>
              <View style={{ marginLeft: 10, paddingLeft: 10 }}>
                <Text>----------------------------------------------------------------------------------------</Text>
              </View>
              <View style={styles.default}>
                <Text>Score: {formatFloat(cls.score, 2)}%</Text>
                <Text style={{ fontSize: '12px', marginTop: '48px', marginBottom: '12px' }}>
                  Assignment Format is (Name, Score / Max Score, Weight, Weighted Score, Lost Points)
                </Text>
                {assignmentTypes &&
                  Object.values(assignmentTypes).map((at, i) => {
                    return (
                      <View style={{ marginBottom: '48px' }} key={i}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                          <Text>{at.name}</Text>
                          <Text style={{ fontSize: '16px', marginHorizontal: '20px' }}>
                            Weight: {formatFloat(at.weight, 2)} | Weighted Score: {formatFloat(at.total_score, 2)} /{' '}
                            {formatFloat(at.max_total_score, 2)} | Lost Points:{' '}
                            {formatFloat(at.max_total_score - at.total_score, 2)}
                          </Text>
                        </View>

                        {LineBreak}
                        {at.assignments &&
                          at.assignments.map((a, j) => {
                            return (
                              <View style={styles.assignmentRow} key={j}>
                                <Text style={{ width: '100px' }}>{a.name}</Text>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: '250px',
                                  }}
                                >
                                  <Text>{a.score}</Text>
                                  <Text>/</Text>
                                  <Text>{a.max_score}</Text>
                                </View>
                                <Text style={{ width: '50px' }}>{formatFloat(a.weight, 2)}</Text>
                                <Text style={{ width: '50px' }}>
                                  {formatFloat(a.weight * (a.score / a.max_score), 2)}
                                </Text>
                                <Text style={{ width: '50px' }}>
                                  {formatFloat(a.weight - a.weight * (a.score / a.max_score), 2)}
                                </Text>
                              </View>
                            );
                          })}
                      </View>
                    );
                  })}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      }
    />
  );
}

export default PDFModal;
