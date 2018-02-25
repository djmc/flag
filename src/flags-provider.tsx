import { deepComputed } from 'deep-computed';
import * as React from 'react';
import { Flags, ResolvedFlags, Value } from './types';
import { key, onFlagUsedCallbackKey } from './key';

export interface FlagProviderProps {
  flags: Flags;
  onFlagUsed: () => {},
  children: React.ReactNode;
}

export interface FlagProviderState {
  computed: ResolvedFlags;
}

export class FlagsProvider extends React.PureComponent<FlagProviderProps, FlagProviderState> {
  public static childContextTypes = { [key]: () => null };

  constructor(props: FlagProviderProps) {
    super(props);

    this.state = {
      computed: deepComputed<Flags, ResolvedFlags>(props.flags),
    };
  }

  public componentWillReceiveProps(props: FlagProviderProps) {
    this.setState({
      computed: deepComputed<Flags, ResolvedFlags>(props.flags),
    });
  }

  public getChildContext() {
    return {
      [key]: this.state.computed,
      [onFlagUsedCallbackKey]: this.props.onFlagUsed,
    };
  }

  public render(): any {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
