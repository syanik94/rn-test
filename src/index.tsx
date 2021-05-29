import React from 'react';
import { AppBootstrap } from "./components/index";
import Navigator from './config/navigator';

export default function App() {
  return (
    <AppBootstrap>
      <Navigator />
    </AppBootstrap>
  );
}