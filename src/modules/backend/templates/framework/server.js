import app from './app.js';
{{DB_IMPORT}}

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    {{DB_CONNECT}}
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();