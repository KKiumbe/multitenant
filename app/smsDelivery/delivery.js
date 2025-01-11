import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

const SmsHistoryPage = () => {
  const navigation = useNavigation();
  const [smsData, setSmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSms, setSelectedSms] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: 'Sent SMS' });
  }, [navigation]);

  const fetchSmsData = async (currentPage = 1, append = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASEURL}/sms-history?page=${currentPage}`);
      const newData = response.data.data;
      setSmsData((prevData) => (append ? [...prevData, ...newData] : newData));
      setTotalPages(Math.ceil(response.data.total / 10));
      setLoading(false);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error fetching SMS data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSmsData(page, page > 1);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1); // Reset to the first page
    await fetchSmsData(1); // Fetch the first page of data
    setRefreshing(false);
  };

  const loadMoreData = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const shortenMessage = (message) => (message.length > 3 ? message.slice(0, 3) + '...' : message);
  const shortenPhone = (phone) => (phone.length > 5 ? phone.slice(0, 5) : phone);
  const shortenDate = (date) => (date.length > 3 ? date.slice(0, 3) + '...' : date);

  const openModal = (item) => {
    setSelectedSms(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <DataTable.Row>
        <DataTable.Cell>{item.clientsmsid}</DataTable.Cell>
        <DataTable.Cell>{shortenPhone(item.mobile)}</DataTable.Cell>
        <DataTable.Cell>{shortenMessage(item.message)}</DataTable.Cell>
        <DataTable.Cell>{item.status}</DataTable.Cell>
        <DataTable.Cell>{shortenDate(new Date(item.createdAt).toLocaleString())}</DataTable.Cell>
      </DataTable.Row>
    </TouchableOpacity>
  );

  if (initialLoad) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS History</Text>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Client SMS ID</DataTable.Title>
          <DataTable.Title>Mobile</DataTable.Title>
          <DataTable.Title>Message</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Created At</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={smsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No SMS messages found.</Text>}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && !initialLoad && <ActivityIndicator size="small" color="#6200EE" />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </DataTable>

      {selectedSms && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>SMS Details</Text>
              <Text><Text style={styles.modalLabel}>Client SMS ID:</Text> {selectedSms.clientsmsid}</Text>
              <Text><Text style={styles.modalLabel}>Mobile:</Text> {selectedSms.mobile}</Text>
              <Text><Text style={styles.modalLabel}>Message:</Text> {selectedSms.message}</Text>
              <Text><Text style={styles.modalLabel}>Status:</Text> {selectedSms.status}</Text>
              <Text><Text style={styles.modalLabel}>Created At:</Text> {new Date(selectedSms.createdAt).toLocaleString()}</Text>

              <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.closeButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  table: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default SmsHistoryPage;
