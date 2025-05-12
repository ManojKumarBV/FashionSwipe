import { useEffect, useState } from 'react';
import config from "../../capacitor.config";
import { APP_VERSION } from '@/data/constants';
const Version = () => {
  const [deployEnv, setDeployEnv] = useState('');
  const version = APP_VERSION

  useEffect(() => {
    const serverConfig = config.server;
    const deployEnv = serverConfig?.url?.startsWith('https') ? 'Prod' : 'Dev';
    setDeployEnv(deployEnv);
  }, []);

  return (
    <div className="fixed bottom-2 right-1/2 translate-x-1/2 text-xs text-gray-500 px-2 py-1 sm:right-2 sm:translate-x-0">
      v{version}_{deployEnv}
    </div>
  );
};

export default Version;