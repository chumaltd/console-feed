import * as React from 'react';
import { Context } from '../../definitions/Component';
interface Props {
    theme?: Context;
    data: any;
}
declare class CustomInspector extends React.PureComponent<Props, any> {
    render(): JSX.Element;
    getCustomNode(data: any): JSX.Element;
    nodeRenderer(props: any): JSX.Element;
}
declare const _default: React.FC<import("emotion-theming/types/helper").AddOptionalTo<Props & React.RefAttributes<CustomInspector>, "theme">>;
export default _default;
