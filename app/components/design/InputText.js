import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const InputText = ({ placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		backgroundColor: colors.grey,
		color: colors.lightGrey,
		fontSize: 16,
	},
});

export default InputText;
