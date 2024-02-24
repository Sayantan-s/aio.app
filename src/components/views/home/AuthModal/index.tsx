import { Card } from '@components/atoms';
import { Logo } from '@components/constants/Logo';
import { Modal } from '@components/organisms/Modal';
import type { FC, FormEventHandler } from 'react';
import type { Props } from './types';

export const AuthPopup: FC<Props> = ({ show }) => {
  const handleSignUp: FormEventHandler = async (eve) => {
    eve.preventDefault();
  };
  return (
    <Modal show={show}>
      <Card bordered className="flex w-[500px] justify-center space-y-2 px-6 py-8">
        <Logo className="mx-auto" />
        <form onSubmit={handleSignUp}>
          <div>
            <span className="block">E-Mail Address</span>
            <input
              type="email"
              placeholder="Enter your email..."
              className="mt-2 w-full border bg-transparent px-4 py-2"
            />
          </div>
          <div className="mt-4">
            <span className="block">Password</span>
            <input
              type="password"
              placeholder="Enter your password..."
              className="mt-2 w-full border bg-transparent px-4 py-2"
            />
          </div>
          <button className="mt-7 w-full bg-slate-50 p-2">Submit</button>
        </form>
        <button className="mx-auto flex w-full items-center justify-center space-x-2 rounded-3xl px-1">
          <span>Easy access</span>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1696 6C17.273 7.55556 19.1622 9.37278 20.7905 11.4057C20.9302 11.5801 21 11.79 21 12M15.1696 18C17.273 16.4444 19.1622 14.6272 20.7905 12.5943C20.9302 12.4199 21 12.21 21 12M21 12H3"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-slate-500"
            />
          </svg>
        </button>
      </Card>
    </Modal>
  );
};
