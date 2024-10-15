import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CommunityApp() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect to People Like You</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} // Placeholder for profile pic
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.profileName}>Mitcfasdasdfshell Barber</Text>
          <Text style={styles.profileLocation}>Jakarta, Indonesia</Text>
        </View>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectText}>Connect</Text>
        </TouchableOpacity>
      </View>

      {/* Explore Communities Section */}
      <Text style={styles.sectionTitle}>Explore Communities</Text>
      <View style={styles.communityList}>
        <CommunityCard
          title="Coping with Depression"
          members="120"
          imageUrl="https://via.placeholder.com/150"
        />
        <CommunityCard
          title="Relationship Advice"
          members="85"
          imageUrl="https://via.placeholder.com/150"
        />
        <CommunityCard
          title="Hunter x Hunter Community"
          members="150"
          imageUrl="https://via.placeholder.com/150"
        />
        <CommunityCard
          title="Boruto Next Generation"
          members="100"
          imageUrl="https://via.placeholder.com/150"
        />
      </View>
    </ScrollView>
  );
}

function CommunityCard({ title, members, imageUrl }: { title: string, members: string, imageUrl: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.communityImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardMembers}>{members} follow</Text>
      </View>
      <TouchableOpacity style={styles.cardButton}>
        <Feather name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileLocation: {
    fontSize: 14,
    color: '#777',
  },
  connectButton: {
    marginLeft: 'auto',
    backgroundColor: '#34d399',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  connectText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  communityList: {
    flexDirection: 'column',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardMembers: {
    fontSize: 14,
    color: '#777',
  },
  cardButton: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 50,
  },
});
