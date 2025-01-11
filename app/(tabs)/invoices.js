import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { TextInput, Button, Text, Snackbar, FAB, Portal, Menu, IconButton, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { router } from 'expo-router';
import useAuthStore from '../../store/authStore';

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

const InvoiceScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [fabVisible, setFabVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const limit = 20;
  const currentUser = useAuthStore((state) => state.currentUser);
  const { colors } = useTheme();



  useEffect(() => {
    if (!currentUser) {
      router.push('login'); // Redirect to login page if the user is not logged in
    }
  }, [currentUser]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchInvoices(true).then(() => setRefreshing(false));
  };

  const fetchInvoices = async (reset = false) => {
    try {
      if (reset) {
        setOffset(0);
        setInvoices([]);
      }
  
      setLoading(true);
      const response = await axios.get(`${BASEURL}/invoices/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          status: statusFilter,
          offset: reset ? 0 : offset,
          limit: limit,
        },
      });
  
      const data = Array.isArray(response.data) ? response.data : [];
      if (data.length > 0) {
        setInvoices((prev) => [...prev, ...data]);
        setOffset((prev) => prev + limit);
      } else if (reset) {
        setInvoices([]); // Clear only on reset when no data is found
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setSnackbarMessage('Failed to fetch invoices. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSearch = async () => {
    setIsSearching(true);
    if (!searchTerm.trim()) {
      fetchInvoices(true);
      setIsSearching(false);
      return;
    }

    try {
      const isPhoneNumber = /^\d+$/.test(searchTerm);
      const response = await axios.get(`${BASEURL}/invoices/search`, {
        params: {
          phone: isPhoneNumber ? searchTerm : undefined,
          name: !isPhoneNumber ? searchTerm : undefined,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching invoices:', error);
      setSnackbarMessage('Error searching invoices.');
      setSnackbarOpen(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScroll = async () => {
    if (!loadingMore && !loading && invoices.length > 0) {
      setLoadingMore(true);
      await fetchInvoices();
      setLoadingMore(false);
    }
  };
  
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    fetchInvoices(true);
  };

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleFetchReports = () => {
    setSnackbarMessage('Fetching invoice reports...');
    setSnackbarOpen(true);
  };

  const handleSendBills = async () => {
    try {
      const response = await axios.post(`${BASEURL}/send-bills`);
      console.log('Bills sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending bills:', error.response ? error.response.data : error.message);
    }
  };

  

  useFocusEffect(
    useCallback(() => {
      if (loading) {
        fetchInvoices(true);
      }
      setFabVisible(true);
  
      return () => {
        setFabVisible(false);
      };
    }, [loading]) // Add dependencies to avoid re-calling unnecessarily
  );
  

 

    const renderItem = ({ item }) => {
      if (!item) return null;
    
    return (
      <View style={styles.row} onTouchEnd={() => router.push(`invoices/${item.id}`)}>
      <Text style={styles.cell}>{item.invoiceNumber ? item.invoiceNumber.slice(0, 4) : 'N/A'}</Text>
      <Text style={styles.cell}>{item.customer?.firstName || 'N/A'}</Text>
      <Text style={styles.cell}>{item.invoiceAmount || 'N/A'}</Text>
      <Text style={[styles.cell, { color: getStatusColor(item.status) }]}>{item.status || 'N/A'}</Text>
    </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CANCELLED':
        return colors.secondary; // Grey shade
      case 'UNPAID':
        return colors.primary; // Blue shade
      case 'PAID':
        return colors.success; // Green shade
      case 'PPAID':
        return '#cce5ff'; // Light blue shade for Partially Paid
      default:
        return colors.text; // Default text color
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="menu"
          color="#007BFF"
          size={30}
          onPress={handleMenuToggle}
          style={styles.menu}
        />
        <Text style={styles.title}>Invoices</Text>
        <Menu
          visible={menuVisible}
          onDismiss={handleMenuToggle}
          anchor={<IconButton icon="dots-vertical" onPress={handleMenuToggle} style={styles.menu} />}
        >
          <Menu.Item onPress={handleFetchReports} title="Fetch Reports" />
          <Menu.Item onPress={handleSendBills} title="SMS Bills" />
        </Menu>
      </View>

      <View style={styles.filterContainer}>
        <Button
          mode="contained"
          onPress={() => handleStatusFilter('UNPAID')}
          style={[styles.filterButton, statusFilter === 'UNPAID' && styles.activeFilter]}
        >
          Unpaid
        </Button>
        <Button
          mode="contained"
          onPress={() => handleStatusFilter('PAID')}
          style={[styles.filterButton, statusFilter === 'PAID' && styles.activeFilter]}
        >
          Paid
        </Button>
        <Button
          mode="contained"
          onPress={() => handleStatusFilter('CANCELLED')}
          style={[styles.filterButton, statusFilter === 'CANCELLED' && styles.activeFilter]}
        >
          Cancelled
        </Button>
        <Button
          mode="contained"
          onPress={() => handleStatusFilter('PPAID')}
          style={[styles.filterButton, statusFilter === 'PPAID' && styles.activeFilter]}
        >
          PP
        </Button>
      </View>

      <TextInput
        label="Search by Name or Phone Number"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={styles.searchInput}
        onSubmitEditing={handleSearch}
      />

      <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
        {isSearching ? 'Searching...' : 'Search'}
      </Button>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
       

        <FlatList
  data={invoices.filter(invoice => !statusFilter || invoice.status === statusFilter)}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()} // Simplify the keyExtractor
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  ListHeaderComponent={
    invoices.length > 0 && (
      <View style={styles.row}>
        <Text style={styles.cell}>Invoice No</Text>
        <Text style={styles.cell}>Customer Name</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Status</Text>
      </View>
    )
  }
  ListEmptyComponent={
    !loading && (
      <View style={styles.row}>
        <Text>No invoices found.</Text>
      </View>
    )
  }
  onEndReached={handleScroll}
  onEndReachedThreshold={0.1}
  ListFooterComponent={
    loadingMore ? <ActivityIndicator size="small" color="#007BFF" style={styles.loader} /> : null
  }
/>



       
      )}

      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => setSnackbarOpen(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>

      {fabVisible && (
        <Portal>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => router.push('invoices/create')}
          />
        </Portal>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    paddingTop: 50,
  },
  menu: {
    marginRight: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: '#007BFF',
  },
  searchInput: {
    marginBottom: 16,
  },
  searchButton: {
    marginBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center', // Center align text in cells
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: '#007BFF',
  },
});

export default InvoiceScreen;