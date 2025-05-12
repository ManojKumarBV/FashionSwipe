import { useEffect, useState } from 'react';
import config from "../../capacitor.config";
const Version = () => {
  const [version, setVersion] = useState('');
  const [deployEnv, setDeployEnv] = useState('');

  useEffect(() => {

    const serverConfig = config.server;
    const deployEnv = serverConfig?.url?.startsWith('https') ? 'Prod' : 'Dev';
    setDeployEnv(deployEnv);

    fetch('/package.json')
      .then(response => response.json())
      .then(data => {
        setVersion(data.version);
      })
      .catch(error => {
        console.error('Error fetching version:', error);
        setVersion('Version not available');
      });
  }, []);

  return (
    <div className="fixed bottom-2 right-1/2 translate-x-1/2 text-xs text-gray-500 px-2 py-1 sm:right-2 sm:translate-x-0">
      v{version}_{deployEnv}
    </div>
  );
};

export default Version;