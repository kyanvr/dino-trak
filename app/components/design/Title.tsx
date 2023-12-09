import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const Title = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 50,
		color: colors.white,
	},
});

export default Title;
