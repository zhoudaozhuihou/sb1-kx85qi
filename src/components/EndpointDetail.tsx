import React from 'react';
import { Paper, Typography, Divider, Tabs, Tab, Box, Chip } from '@material-ui/core';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { PathItem } from '../types/swagger';

interface EndpointDetailProps {
  path: string;
  method: string;
  details: PathItem;
}

const methodColors: { [key: string]: string } = {
  get: 'bg-blue-500',
  post: 'bg-green-500',
  put: 'bg-yellow-500',
  delete: 'bg-red-500',
  patch: 'bg-purple-500',
};

export const EndpointDetail: React.FC<EndpointDetailProps> = ({
  path,
  method,
  details,
}) => {
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    Prism.highlightAll();
  }, [details, tab]);

  return (
    <Paper className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Chip
          label={method.toUpperCase()}
          className={`${methodColors[method.toLowerCase()]} text-white`}
        />
        <Typography variant="h5">
          {path}
        </Typography>
      </div>

      {details.tags && (
        <div className="flex gap-2 mb-4">
          {details.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </div>
      )}

      <Typography variant="body1" className="mb-4">
        {details.description || details.summary}
      </Typography>

      <Divider className="my-4" />

      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        <Tab label="Parameters" />
        <Tab label="Request Body" />
        <Tab label="Responses" />
      </Tabs>

      <Box className="mt-4">
        {tab === 0 && (
          <div>
            {details.parameters?.length ? (
              details.parameters.map((param, index) => (
                <Paper key={index} className="p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Typography variant="subtitle1" className="font-bold">
                      {param.name}
                    </Typography>
                    {param.required && (
                      <Chip label="Required" size="small" color="secondary" />
                    )}
                    <Chip label={param.in} size="small" />
                  </div>
                  {param.description && (
                    <Typography variant="body2" color="textSecondary" className="mb-2">
                      {param.description}
                    </Typography>
                  )}
                  <Typography variant="caption" className="text-gray-600">
                    Type: {param.schema.type}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography color="textSecondary">No parameters</Typography>
            )}
          </div>
        )}

        {tab === 1 && (
          <div>
            {details.requestBody ? (
              <div>
                {Object.entries(details.requestBody.content).map(([contentType, { schema }]) => (
                  <div key={contentType} className="mb-4">
                    <Chip label={contentType} size="small" className="mb-2" />
                    <pre className="language-json">
                      <code>
                        {JSON.stringify(schema, null, 2)}
                      </code>
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <Typography color="textSecondary">No request body</Typography>
            )}
          </div>
        )}

        {tab === 2 && (
          <div>
            {Object.entries(details.responses).map(([status, response]) => (
              <Paper key={status} className="p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Chip
                    label={status}
                    color={status.startsWith('2') ? 'primary' : 'default'}
                    className="mb-2"
                  />
                  <Typography variant="subtitle1">
                    {response.description}
                  </Typography>
                </div>
                {response.content && Object.entries(response.content).map(([contentType, { schema }]) => (
                  <div key={contentType} className="mt-2">
                    <Chip label={contentType} size="small" className="mb-2" />
                    <pre className="language-json">
                      <code>
                        {JSON.stringify(schema, null, 2)}
                      </code>
                    </pre>
                  </div>
                ))}
              </Paper>
            ))}
          </div>
        )}
      </Box>
    </Paper>
  );
};