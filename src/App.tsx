import React, { useState } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  createMuiTheme,
  ThemeProvider,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FileUploader } from './components/FileUploader';
import { EndpointList } from './components/EndpointList';
import { EndpointDetail } from './components/EndpointDetail';
import { ApiOverview } from './components/ApiOverview';
import { ThemeToggle } from './components/ThemeToggle';
import { SwaggerSpec } from './types/swagger';

function App() {
  const [spec, setSpec] = useState<SwaggerSpec | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<{
    path: string;
    method: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
    },
  });

  const handleFileLoad = (content: string) => {
    try {
      const parsedSpec = JSON.parse(content);
      if (!parsedSpec.swagger && !parsedSpec.openapi) {
        throw new Error('Invalid Swagger/OpenAPI specification');
      }
      setSpec(parsedSpec);
      setError(null);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setError('Invalid JSON or Swagger/OpenAPI specification');
    }
  };

  const filteredPaths = spec ? Object.entries(spec.paths).reduce((acc, [path, methods]) => {
    if (path.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[path] = methods;
    }
    return acc;
  }, {} as SwaggerSpec['paths']) : {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="flex-grow">
              API Documentation Viewer
            </Typography>
            <ThemeToggle
              isDark={isDarkMode}
              onToggle={() => setIsDarkMode(!isDarkMode)}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" className="mt-8">
          {!spec ? (
            <FileUploader onFileLoad={handleFileLoad} />
          ) : (
            <>
              <ApiOverview spec={spec} />
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search endpoints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <EndpointList
                    paths={filteredPaths}
                    selectedEndpoint={selectedEndpoint ? `${selectedEndpoint.path}-${selectedEndpoint.method}` : null}
                    onEndpointSelect={(path, method) => setSelectedEndpoint({ path, method })}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  {selectedEndpoint && spec.paths[selectedEndpoint.path] && (
                    <EndpointDetail
                      path={selectedEndpoint.path}
                      method={selectedEndpoint.method}
                      details={spec.paths[selectedEndpoint.path][selectedEndpoint.method]}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Container>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;