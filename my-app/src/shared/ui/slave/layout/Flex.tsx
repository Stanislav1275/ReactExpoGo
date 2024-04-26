import styled from 'shared/lib/styled';
import {View} from "shared/ui/slave/Themed";
import PropTypes from 'prop-types';

const getFlexStylesFromShorthand = style =>
    style === 'end' || style === 'start' ? `flex-${style}` : style;

const buildFlexStyles = ({
     align = 'stretch',
     self,
     flex,
     flexDirection = 'row',
     justify = 'start',
     wrap,
     grow,
     shrink,
     centered,
     cover,
     gap
 }) => {

    const props = {
        alignItems: getFlexStylesFromShorthand(align),
        flexDirection,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent: getFlexStylesFromShorthand(justify),
    };

    if (self) {
        props.alignSelf = getFlexStylesFromShorthand(self);
    }

    if (typeof flex !== 'undefined') {
        props.flex = Number(flex);
    }

    if (typeof grow !== 'undefined') {
        props.flexGrow = Number(grow);
    }

    if (typeof gap !== 'undefined') {
        props.gap = Number(gap);
    }

    if (typeof shrink !== 'undefined') {
        props.flexShrink = Number(shrink);
    }

    if (centered) {
        props.alignItems = 'center';
        props.justifyContent = 'center';
    }

    if (cover) {
        Object.assign(props, StyleSheet.absoluteFillObject);
    }

    return props;
}

const flexPropTypes = {
    align: PropTypes.oneOf(['baseline', 'center', 'end', 'start', 'stretch']),
    flexDirection: PropTypes.oneOf([
        'column',
        'column-reverse',
        'row',
        'row-reverse',
    ]),
    flex: PropTypes.number,
    grow: PropTypes.number,
    justify: PropTypes.oneOf([
        'center',
        'end',
        'space-around',
        'space-between',
        'start',
    ]),
    self: PropTypes.oneOf(['center', 'end', 'start', 'stretch']),
    shrink: PropTypes.number,
    wrap: PropTypes.bool,
    gap: PropTypes.number,
};

const Flex = styled(View)(buildFlexStyles)

Flex.displayName = 'Flex';


export default Flex;
