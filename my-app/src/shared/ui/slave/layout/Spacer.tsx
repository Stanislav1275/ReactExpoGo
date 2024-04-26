import styled from 'shared/lib/styled';

import {View} from "react-native";

const Spacer = styled(View)(({ height, width }) => ({
    height,
    width
}));

export default Spacer;
