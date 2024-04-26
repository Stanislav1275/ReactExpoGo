import React from 'react';

const hasSymbol = typeof Symbol === 'function' && Symbol.for;

// copied from react-is
const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
const REACT_FORWARD_REF_TYPE = hasSymbol
    ? Symbol.for('react.forward_ref')
    : 0xead0;

/**
 * Adapted from hoist-non-react-statics to avoid the react-is dependency.
 */
const REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true,
};

const KNOWN_STATICS = {
    arguments: true,
    arity: true,
    callee: true,
    caller: true,
    length: true,
    name: true,
    prototype: true,
};

const FORWARD_REF_STATICS = {
    $$typeof: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    render: true,
};

const MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
};

const TYPE_STATICS = {
    [REACT_FORWARD_REF_TYPE]: FORWARD_REF_STATICS,
    [REACT_MEMO_TYPE]: MEMO_STATICS,
};

// adapted from react-is
function isMemo(object) {
    const $$typeofType = 'type' in object && object.type.$$typeof;

    return $$typeofType === REACT_MEMO_TYPE;
}

function getStatics(component) {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }

    // React v16.12 and above
    return '$$typeof' in component
        ? TYPE_STATICS[(component['$$typeof'])]
        : REACT_STATICS;
}

const defineProperty = Object.defineProperty;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const getOwnPropertySymbols = Object.getOwnPropertySymbols;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf = Object.getPrototypeOf;
const objectPrototype = Object.prototype;

export default function hoistNonReactStatic(targetComponent, sourceComponent, excludelist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            const inheritedComponent = getPrototypeOf(sourceComponent);

            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatic(targetComponent, inheritedComponent, excludelist);
            }
        }

        let keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        const targetStatics = getStatics(targetComponent);
        const sourceStatics = getStatics(sourceComponent);

        for (const item of keys) {
            const key = (item);
            if (
                !(key in KNOWN_STATICS) &&
                !excludelist?.[key] &&
                !(sourceStatics && key in sourceStatics) &&
                !(targetStatics && key in targetStatics)
            ) {
                const descriptor = getOwnPropertyDescriptor(sourceComponent, key);

                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {
                    /* ignore */
                }
            }
        }
    }

    return targetComponent;
}

