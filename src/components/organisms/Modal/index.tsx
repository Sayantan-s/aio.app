import { Fragment, type FC, type PropsWithChildren } from 'react';
import Portals from '../Portals';

interface Props {
  show: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export const Modal: FC<PropsWithChildren<Props>> = ({ children, show }) => {
  return (
    <Portals targetNodeId="dialogs">
      {show ? (
        <Fragment>
          <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-transparent">
            {children}
          </div>
          <div
            className="fixed top-0 left-0 h-full w-full bg-black/30"
            style={{ backdropFilter: 'blur(20px)' }}
          />
        </Fragment>
      ) : null}
    </Portals>
  );
};
