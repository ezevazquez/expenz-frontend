'use client'

import { useState, useEffect } from 'react';

type TestData = {
  message: string;
  data: {
    environment: string;
    timestamp: string;
    version: string;
  };
} | null;

export function TemporaryHome() {
  const [backendStatus, setBackendStatus] = useState<string>('Loading...');
  const [testData, setTestData] = useState<TestData>(null);
  const [error, setError] = useState<string>('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    // Test health endpoint
    fetch(`${backendUrl}/health`)
      .then(() => {
        setBackendStatus('Connected');
      })
      .catch(err => {
        setBackendStatus('Error');
        setError(err.message);
      });

    // Test API endpoint
    fetch(`${backendUrl}/api/test`)
      .then(response => response.json())
      .then((data: TestData) => {
        setTestData(data);
      })
      .catch(err => {
        console.error('API test failed:', err);
      });
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Expenz - Test Page
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Backend Status */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Backend Status
              </h2>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  backendStatus === 'Connected' ? 'bg-green-500' : 
                  backendStatus === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-medium">{backendStatus}</span>
              </div>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
              <p className="text-gray-600 text-sm mt-2">
                Backend URL: {backendUrl}
              </p>
            </div>

            {/* Test Data */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                API Test Data
              </h2>
              {testData ? (
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">{testData.message}</p>
                  <div className="bg-white rounded p-3 text-sm">
                    <pre className="text-gray-700">
                      {JSON.stringify(testData.data, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Loading test data...</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Actions
            </h3>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => window.open(`${backendUrl}/health`, '_blank')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Test Health Endpoint
              </button>
              <button
                onClick={() => window.open(`${backendUrl}/api/test`, '_blank')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Test API Endpoint
              </button>
              <button
                onClick={() => window.open(`${backendUrl}/`, '_blank')}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Backend Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemporaryHome; 