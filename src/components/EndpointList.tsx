import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Collapse,
  Typography,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { PathItem } from '../types/swagger';

interface EndpointListProps {
  paths: { [path: string]: { [method: string]: PathItem } };
  selectedEndpoint: string | null;
  onEndpointSelect: (path: string, method: string) => void;
}

const methodColors: { [key: string]: string } = {
  get: 'bg-blue-500',
  post: 'bg-green-500',
  put: 'bg-yellow-500',
  delete: 'bg-red-500',
  patch: 'bg-purple-500',
};

export const EndpointList: React.FC<EndpointListProps> = ({
  paths,
  selectedEndpoint,
  onEndpointSelect,
}) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleExpand = (path: string) => {
    setExpanded(expanded.includes(path)
      ? expanded.filter(p => p !== path)
      : [...expanded, path]
    );
  };

  return (
    <List className="w-full">
      {Object.entries(paths).map(([path, methods]) => (
        <React.Fragment key={path}>
          <ListItem button onClick={() => handleExpand(path)}>
            <ListItemText primary={path} />
            {expanded.includes(path) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded.includes(path)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Object.entries(methods).map(([method, details]) => (
                <ListItem
                  button
                  key={`${path}-${method}`}
                  className="pl-8"
                  selected={selectedEndpoint === `${path}-${method}`}
                  onClick={() => onEndpointSelect(path, method)}
                >
                  <Chip
                    label={method.toUpperCase()}
                    size="small"
                    className={`${methodColors[method.toLowerCase()]} text-white mr-2`}
                  />
                  <ListItemText
                    primary={details.summary || path}
                    secondary={details.description}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};