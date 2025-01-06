import React, { useState } from 'react';
import { ArrowLeft, Search, Upload } from 'lucide-react';
import Layout from '../components/Layout';

export default function Composer() {
  const [mode, setMode] = useState<'select' | 'template' | 'custom'>('select');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
  };

  const renderContent = () => {
    switch (mode) {
      case 'select':
        return (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-16 mt-16">
            <div
              onClick={() => setMode('template')}
              className="bg-[#0A0A0A] rounded-xl p-12 text-center cursor-pointer border border-orange-500 hover:border-orange-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">Build From Template</h3>
              <p className="text-gray-400">Choose from a list of pre-built templates to get started quickly!</p>
            </div>
            <div className="text-2xl text-gray-600">OR</div>
            <div
              onClick={() => setMode('custom')}
              className="bg-[#0A0A0A] rounded-xl p-12 text-center cursor-pointer border border-orange-500 hover:border-orange-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">Craft Your Own</h3>
              <p className="text-gray-400">Build up a new project by uploading your own files to get started!</p>
            </div>
          </div>
        );
      case 'template':
        return (
          <div className="mt-8">
            <div className="bg-[#0A0A0A] rounded-xl p-16 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Search size={20} />
                <span>No strategies found</span>
              </div>
            </div>
          </div>
        );
      case 'custom':
        return (
          <div
            className={`bg-[#0A0A0A] rounded-xl p-16 mt-8 text-center transition-all duration-300 ${
              dragActive ? 'border-2 border-dashed border-orange-500' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl mb-2 text-white">Drag and drop files here to get started.</p>
            <p className="text-sm text-gray-400">Only .py, .txt and .json files are allowed.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'template' ? 'Alpha Pool' : 'Composer'}
          </h2>
          {mode === 'select' && (
            <p className="text-gray-400 mt-1">
              A tool to help composing zip files ready for cloud deployment.
            </p>
          )}
        </div>
        {mode !== 'select' && (
          <button
            onClick={() => setMode('select')}
            className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        )}
      </div>
      {renderContent()}
    </Layout>
  );
}