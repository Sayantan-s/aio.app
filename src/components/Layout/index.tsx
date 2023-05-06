import type { ComponentType } from 'react';

const gradient = `radial-gradient(at 88% 11%, rgba(129, 40, 197, 0.108) 0, transparent 100%), radial-gradient(at 28% 28%, rgba(38, 82, 226, 0.153) 0, transparent 69%), radial-gradient(at 50% 57%, rgba(157, 23, 77, 0.16) 0, transparent 100%)`;

export const withLayout = <TProps extends object>(WrappedComponent: ComponentType<TProps>) => {
  const Component = (props: TProps) => (
    <main
      className="relative h-screen w-full overflow-hidden bg-white p-10 dark:bg-slate-900"
      style={{ backgroundImage: gradient }}
    >
      <div className="mx-auto h-full max-w-7xl overflow-hidden rounded-xl bg-white p-4 backdrop-blur-3xl dark:bg-slate-900/50">
        <WrappedComponent {...props} />
      </div>
    </main>
  );
  return Component;
};
