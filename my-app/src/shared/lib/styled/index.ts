import React from 'react';
import isEqual from 'react-fast-compare';
import hoist from "./hoist";
import {useColorScheme} from "../colorSheme/useColorScheme.web";

function useResolvedAttrs(theme, props, attrs = []) {
    // NOTE: can't memoize this
    // returns [context, resolvedAttrs]
    // where resolvedAttrs is only the things injected by the attrs themselves
    const context = { ...props, theme };
    const resolvedAttrs = {};

    for (let i = 0; i < attrs.length; i++) {
        const attrDef = attrs[i];
        let resolvedAttrDef =
            typeof attrDef === 'function' ? attrDef(context) : attrDef;
        let key;

        for (key in resolvedAttrDef) {
            context[key] = resolvedAttrs[key] = resolvedAttrDef[key];
        }
    }

    return [context, resolvedAttrs];
}

function processStyles(nestedStyles, props) {
    let result = {};

    for (let i = 0; i < nestedStyles.length; i++) {
        const styles = nestedStyles[i];

        if (typeof styles === 'function') {
            Object.assign(result, styles(props));
        } else if (typeof styles === 'object') {
            const keys = Object.keys(styles);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const item = styles[key];

                // @ts-expect-error ts-migrate(7053)
                result[key] = typeof item === 'function' ? item(props) : item;
            }
        }
    }

    return result;
}

export default function styled(Component) {
    function attrs(props) {
        StyledComponentFactory.addedAttrs = props;
        return StyledComponentFactory;
    }

    function StyledComponentFactory(styles) {

        let WrappedStyledComponent;

        function StyledComponent({ style, ...props }, ref) {
            const theme = useColorScheme() ?? {};

            const [context, attributes] = useResolvedAttrs(
                theme,
                props,
                WrappedStyledComponent.attrs
            );

            const elementToBeCreated =
                attributes?.$as ||
                props.$as ||
                attributes?.as ||
                props.as ||
                WrappedStyledComponent.target;

            const generatedStyles = processStyles(
                WrappedStyledComponent.styles,
                context
            );

            const computedProps = { ...props, ...attributes };
            // we don't need to pass it since we used it as elementToBeCreated
            // assigning `undefined` will result into wrong `Object.assign` operations
            // in the userland for example
            // Object.assign({ as: true }, { as: undefined }) // { as: undefined }
            delete computedProps.as;
            delete computedProps.$as;

            const forwardedProps = computedProps;

            forwardedProps.ref = ref;

            forwardedProps.style = generatedStyles;

            if (style) {
                // convert to styles array
                forwardedProps.style = [generatedStyles];

                if (Array.isArray(style)) {
                    forwardedProps.style.push(...style);
                } else {
                    forwardedProps.style.push(style);
                }
            }

            return React.createElement(elementToBeCreated, forwardedProps);
        }

        WrappedStyledComponent = React.memo(
            React.forwardRef(StyledComponent),
            isEqual
        );

        WrappedStyledComponent.displayName = `Styled-${Component.name}`;

        WrappedStyledComponent.isStyledComponent = true;

        WrappedStyledComponent.target = Component.isStyledComponent
            ? Component.target
            : Component;

        if (StyledComponentFactory.addedAttrs) {
            WrappedStyledComponent.attrs = Array.isArray(Component.attrs)
                ? Component.attrs.concat(StyledComponentFactory.addedAttrs)
                : [StyledComponentFactory.addedAttrs];
        } else {
            WrappedStyledComponent.attrs = Component.attrs;
        }

        WrappedStyledComponent.styles = Array.isArray(Component.styles)
            ? Component.styles.concat(styles)
            : [styles];

        hoist(WrappedStyledComponent, Component, {
            // all SC-specific things should not be hoisted
            attrs: true,
            displayName: true,
            isStyledComponent: true,
            styles: true,
            target: true,
        });

        return WrappedStyledComponent;
    }

    StyledComponentFactory.attrs = attrs;

    return StyledComponentFactory;
}
