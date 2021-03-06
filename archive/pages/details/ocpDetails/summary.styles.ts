import { global_spacer_md } from '@patternfly/react-tokens';
import React from 'react';

export const styles = {
  skeleton: {
    marginTop: global_spacer_md.value,
  },
  summary: {
    paddingTop: global_spacer_md.value,
  },
  viewAllContainer: {
    marginLeft: '-18px',
    paddingTop: global_spacer_md.value,
  },
} as { [className: string]: React.CSSProperties };
