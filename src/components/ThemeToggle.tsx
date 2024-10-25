import React from 'react';
import { IconButton } from '@material-ui/core';
import { Brightness4, Brightness7 } from '@material-ui/icons';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => (
  <IconButton onClick={onToggle} color="inherit">
    {isDark ? <Brightness7 /> : <Brightness4 />}
  </IconButton>
);