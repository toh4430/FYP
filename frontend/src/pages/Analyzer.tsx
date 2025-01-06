import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import Layout from '../components/Layout'

export default function Analyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.endsWith('.json')) {
      setFile(droppedFile)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.json')) {
      setFile(selectedFile)
    }
  }

  const startAnalysis = () => {
    if (file) {
      setAnalyzing(true)
      // Simulate file analysis
      setTimeout(() => {
        setAnalyzing(false)
        setResult('Analysis complete. Your report is ready.')
      }, 2000)
    }
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-white mb-6">Analyzer</h2>
      <p className="text-gray-400 mb-6">
        Upload your JSON file to start the analysis process.
      </p>
      
      {!file && (
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <Upload className="mx-auto h-16 w-16 text-gray-400" />
          <p className="mt-4 text-lg">Drop your JSON file here to start</p>
          <p className="text-sm text-gray-500 mt-2">
            Your most comprehensive and professional backtest reporting system
          </p>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-6 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md inline-block transition-colors duration-300"
          >
            Select File
          </label>
        </div>
      )}

      {file && (
        <div className="bg-gray-800 rounded-lg p-8">
          <p className="text-xl font-semibold mb-6">Selected file: {file.name}</p>
          {analyzing ? (
            <div className="mt-6">
              <p className="text-lg mb-4">Analyzing...</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-orange-500 h-4 rounded-full w-1/2 transition-all duration-500"></div>
              </div>
            </div>
          ) : (
            <button
              onClick={startAnalysis}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Start Analysis
            </button>
          )}
          {result && (
            <div className="mt-6">
              <p className="text-green-500 text-lg mb-4">{result}</p>
              <button
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
              >
                Analyze Another File
              </button>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

