/**
 * @fileoverview Enforces correct usage of MobX stores (via 'this.store' access)
 * in React class components, specifically requiring the @mobx decorator
 * and disallowing usage in PureComponent.
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
    meta: {
        type: "problem",
        docs: {
            description:
                "Enforce the @mobx decorator when accessing 'this.store' in React class components and disallow it in PureComponent.",
            category: "Best Practices",
            recommended: false,
            url: null,
        },
        fixable: null,
        schema: [],
    },

    create(context) {
        const classComponentStack = [];

        /**
         * Checks if a node represents a React class component (extends Component or PureComponent).
         * @param {import('estree').ClassDeclaration} node The class declaration node.
         * @returns {{isReactComponent: boolean, isPure: boolean}} Status object.
         */
        function getComponentStatus(node) {
            if (!node.superClass) {
                return { isReactComponent: false, isPure: false };
            }

            if (node.superClass.type === "Identifier") {
                const name = node.superClass.name;
                return {
                    isReactComponent: name === "Component" || name === "PureComponent",
                    isPure: name === "PureComponent",
                };
            }

            return { isReactComponent: false, isPure: false };
        }

        /**
         * Checks if a class declaration has the @mobx decorator.
         * @param {import('estree').ClassDeclaration} node The class declaration node.
         * @returns {boolean} True if the @mobx decorator is present.
         */
        function hasObserverDecorator(node) {
            if (!node.decorators || node.decorators.length === 0) {
                return false;
            }

            return node.decorators.some((decorator) => {
                const expression = decorator.expression;
                if (expression.type === "Identifier" && expression.name === "mobx") {
                    return true;
                }
                // Checks for 'mobx-react.mobx' or 'mobx()' if used as a function call
                if (
                    expression.type === "CallExpression" &&
                    expression.callee.type === "Identifier" &&
                    expression.callee.name === "mobx"
                ) {
                    return true;
                }
                return false;
            });
        }

        return {
            // 1. On entering a ClassDeclaration, determine its MobX/React status and push to the stack
            ClassDeclaration(node) {
                const { isReactComponent, isPure } = getComponentStatus(node);
                const isObserver = hasObserverDecorator(node);

                classComponentStack.push({
                    isReactComponent,
                    isPure,
                    isObserver,
                    hasStoreAccess: false, // Will be set to true if 'this.store' is found
                });
            },

            // 2. On exiting a ClassDeclaration, pop the status from the stack
            "ClassDeclaration:exit"() {
                classComponentStack.pop();
            },

            // 3. Check for 'this.store' usage inside any function or method
            MemberExpression(node) {
                const currentClass = classComponentStack[classComponentStack.length - 1];

                if (!currentClass || !currentClass.isReactComponent) {
                    return;
                }

                const isThis = node.object.type === "ThisExpression";
                const isStore = node.property.type === "Identifier" && node.property.name === "store";

                if (isThis && isStore) {
                    currentClass.hasStoreAccess = true;

                    if (currentClass.isPure) {
                        context.report({
                            node,
                            message:
                                "Accessing 'this.store' in a PureComponent is discouraged because PureComponent's shallow comparison often prevents MobX from triggering necessary re-renders. Use a standard 'Component' and ensure the @mobx decorator is applied.",
                        });
                        return;
                    }

                    if (!currentClass.isObserver) {
                        context.report({
                            node,
                            message:
                                "Accessing 'this.store' in a Component requires the @mobx decorator for MobX reactivity to function correctly. Please add '@mobx' to the class declaration.",
                        });
                    }
                }
            },
        };
    },
};
