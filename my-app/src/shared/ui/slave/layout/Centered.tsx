import Flex from './Flex';
import styled from 'shared/lib/styled';

const Centered = styled(Flex).attrs({
    align: 'center',
    justify: 'center',
})({});

export default Centered;
