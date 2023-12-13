import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colors";
import CircularProgress from "react-native-circular-progress-indicator";

const RingProgress = ({ radius = 100, strokeWidth = 35, progress }) => {

	return (
		<View
			style={{
				width: radius * 2,
				height: radius * 2,
				alignSelf: "center",
			}}
		>
			<CircularProgress
				value={progress}
				inActiveStrokeColor={colors.green}
                activeStrokeColor={colors.green}
				inActiveStrokeOpacity={0.2}
				progressValueColor={colors.white}
				valueSuffix={"%"}
                activeStrokeWidth={strokeWidth}
                inActiveStrokeWidth={strokeWidth}
                radius={radius}
                progressValueFontSize={strokeWidth}
			/>
			<AntDesign
				name="arrowright"
				size={strokeWidth * 0.6}
				color={colors.black}
				style={{
					position: "absolute",
					alignSelf: "center",

					top: strokeWidth * 0.05,
				}}
			/>
		</View>
	);
};

export default RingProgress;
