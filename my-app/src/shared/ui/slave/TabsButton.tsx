import styled from "shared/lib/styled";
import {Text} from "shared/ui/slave/Themed";
import ButtonPressAnimation from "shared/ui/slave/animations/ButtonPressAnimation";

export const ListName = styled(Text)({
    color: ({ theme, selected }) => selected ? 'white' : 'rgba(255,255,255,.54)',
    marginTop: 0,
});

export const TabsButton = styled(ButtonPressAnimation).attrs({
    scale: 0.96,
})(({ selected, size = 'medium', theme: { colors } }) => ({
    // marginRight: 16,
    marginRight: 2,
    paddingBottom: 2,
    paddingHorizontal: 10,
    ...(selected && {
        backgroundColor: colors.primary,
        borderRadius: 12,
        height: size === 'small' ? 26 : 30,
        paddingHorizontal: 10,
    }),
}));
