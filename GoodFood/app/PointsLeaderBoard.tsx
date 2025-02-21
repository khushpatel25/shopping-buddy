import { api } from '@/constants/api';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Leader {
  _id: string;
  userId: string;
  points: number;
  email: string;
  firstTimeLogin: boolean;
  minutes: number;
  hearts: number;
  age: number;
  firstName: string;
  gender: string;
  height: number;
  lastName: string;
  shoppingDays: number;
  weight: number;
}

const PointsLeaderBoard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch(`${api}/api/users/getUsersByPoints`); 
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  };

  const renderItem = ({ item, index }: { item: Leader; index: number }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{index + 1} {getMedal(index)}</Text>
      <Text style={styles.cell}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.points}</Text>
      <Text style={styles.cell}>{item.shoppingDays}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.gender}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#D053FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Coins Leaderboard 🏆</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Rank</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Email</Text>
        <Text style={styles.headerCell}>Coins</Text>
        <Text style={styles.headerCell}>Shopping Days</Text>
        <Text style={styles.headerCell}>Age</Text>
        <Text style={styles.headerCell}>Gender</Text>
      </View>
      <FlatList
        data={leaders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No leaderboard data available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D053FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#D053FF',
    padding: 10,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PointsLeaderBoard;
