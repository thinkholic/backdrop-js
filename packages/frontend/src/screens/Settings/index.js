import { useState } from 'react';

import Layout from 'components/Layout';

import Selector from './Selector';
import AppSettings from './App';
// import UserSettings from './User';

import { getSettings } from 'config/settings';

import { Wrapper } from './styled';

const options = getSettings();

export default function Settings() {
  const [selector, setSelector] = useState('app');

  const onSelectHandler = (nextSelector) => {
    setSelector(nextSelector);
  };

  return (
    <Layout title="Settings">
      <Wrapper>
        <Selector
          options={options}
          selected={selector}
          onSelect={onSelectHandler}
        />
        {selector === 'app' && <AppSettings />}
        {/* {selector === 'user' && <UserSettings />} */}
      </Wrapper>
    </Layout>
  );
}
