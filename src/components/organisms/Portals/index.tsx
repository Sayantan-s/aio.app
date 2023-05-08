import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  targetNodeId: string;
}

const Portals: FC<PropsWithChildren<Props>> = ({ children, targetNodeId }) =>
  createPortal(children, document.getElementById(`${targetNodeId}`) as HTMLElement);

export default Portals;
