export interface SwaggerSpec {
  openapi?: string;
  swagger?: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: {
    [path: string]: {
      [method: string]: PathItem;
    };
  };
  components?: {
    schemas?: {
      [name: string]: any;
    };
  };
}

export interface PathItem {
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: {
    content: {
      [contentType: string]: {
        schema: any;
      };
    };
  };
  responses: {
    [statusCode: string]: {
      description: string;
      content?: {
        [contentType: string]: {
          schema: any;
        };
      };
    };
  };
  tags?: string[];
}

export interface Parameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema: any;
}