import React from 'react';
import { Paper, Typography, Chip } from '@material-ui/core';
import { SwaggerSpec } from '../types/swagger';

interface ApiOverviewProps {
  spec: SwaggerSpec;
}

export const ApiOverview: React.FC<ApiOverviewProps> = ({ spec }) => {
  return (
    <Paper className="p-6 mb-4">
      <Typography variant="h4" className="mb-2">
        {spec.info.title}
      </Typography>
      <Typography variant="subtitle1" className="mb-4 text-gray-600">
        Version: {spec.info.version}
      </Typography>
      {spec.info.description && (
        <Typography variant="body1" className="mb-4">
          {spec.info.description}
        </Typography>
      )}
      <div className="flex gap-2">
        {spec.openapi && (
          <Chip label={`OpenAPI ${spec.openapi}`} color="primary" />
        )}
        {spec.swagger && (
          <Chip label={`Swagger ${spec.swagger}`} color="primary" />
        )}
      </div>
    </Paper>
  );
};