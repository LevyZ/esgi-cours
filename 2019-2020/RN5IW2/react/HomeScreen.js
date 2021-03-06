import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({route}) => {
  const [count, setCount] = useState(null);

  const onSave = () => {
    AsyncStorage.setItem('count', JSON.stringify(count)).then(() =>
      alert('saved'),
    );
  };
  const onAdd = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    AsyncStorage.getItem('count').then(data => setCount(data));
    fetch('http://localhost:8080/posts')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  console.log(route.params ? route.params.from : null);
  return (
    <Card style={styles.card}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Title>Card title {count} </Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Actions>
        <Button onPress={() => alert('test')}>Cancel</Button>
        <Button onPress={onAdd}>+1</Button>
        <Button onPress={onSave}>Save</Button>
        <IconButton icon="history" />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default HomeScreen;
