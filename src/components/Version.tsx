import { useMemo } from 'react';
import config from "../../capacitor.config";

const Version = () => {
  const deployEnv = useMemo(() => {
    const serverUrl = config?.server?.url;
    return serverUrl?.startsWith('https') ? 'Prod' : 'Dev';
  }, [config?.server?.url]);

  const version = import.meta.env.VITE_VERSION;

  return (
    <div className="fixed bottom-2 right-1/2 translate-x-1/2 text-xs text-gray-500 px-2 py-1 sm:right-2 sm:translate-x-0">
      v{version}_{deployEnv}
    </div>
  );
};

export default Version;